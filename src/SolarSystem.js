import {extend, useThree} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as tf from "@tensorflow/tfjs";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Vector3} from "three";
import {sqrt} from "@tensorflow/tfjs";

export default function SolarSystem({planetsInit, constants, systemIndicators, setSystemIndicators}) {
    extend({OrbitControls });

    // setSystemIndicators({kineticEnergy: 0, potentialEnergy: 0, systemEnergy: 0})

    let planets = [...planetsInit].map(p => {
        return {id: p.id, m: p.m, x: [p.x, p.y, p.z], v: [p.vx, p.vy, p.vz], r: p.r, color: p.color}
    })
    const GConst = +constants.G
    const dt = +constants.step // todo step in time
    const trajSize = 5 * dt; // todo tail length
    const tailInaccuracy = +constants.tailInaccuracy


    const numberOfPlanets = planets.length;

    const xInitialArray = planets.map(planet => planet.x);
    const vInitialArray = planets.map(planet => planet.v);

    const masses = planets.map(planet => planet.m);

    const xInitial = tf.tensor2d(xInitialArray, [numberOfPlanets, 3]);
    const vInitial = tf.tensor2d(vInitialArray, [numberOfPlanets, 3]);
    const G = tf.scalar(GConst);

    const initialTraj = xInitialArray.map(x => Array(trajSize).fill(x));


    const [pos, setPos] = useState(xInitialArray);
    const [traj, setTraj] = useState(initialTraj);
    const x = useRef(xInitial);
    const v = useRef(vInitial);
    const nTimeSteps = useRef(0);
    const dtTensor = useMemo(() => tf.scalar(dt), [dt]);
    const compute = useCallback(() => {
        const [newX, newV] = tf.tidy(() => {
            let newX = x.current
            let newV = v.current
            if (numberOfPlanets > 0) {
                const a = calcAandE(x.current, v.current);
                newX = x.current.add(tf.mul(v.current, dtTensor));
                newV = v.current.add(tf.mul(a, dtTensor));
            }
            return [newX, newV];
        });

        tf.dispose([x.current, v.current]);
        x.current = newX;
        v.current = newV;

        if (numberOfPlanets > 0) {
            newX.array().then(newPos => {
                setPos(newPos);
                if (nTimeSteps.current++ % tailInaccuracy === 0) {
                    setTraj(traj =>
                        traj.map((points, i) =>
                            points.slice(-trajSize + 1).concat([newPos[i]])
                        )
                    );
                }
            });
        }
    }, [x, v, dtTensor]);

    useEffect(() => {
        requestAnimationFrame(() => {
                compute();
        });
    }, [pos, compute]);

    const handleUpdateGeometry = useCallback(self => {
        self.verticesNeedUpdate = true;
    }, []);
    const { camera } = useThree();

    function calcAandE(x, v) {
        const unstackedX = tf.unstack(x);
        const unstackedV = tf.unstack(v);
        const accelerations = Array(numberOfPlanets).fill(tf.tensor1d([0, 0, 0]));
        let Ek = 0
        let Ep = 0
        for (let i = 0; i < numberOfPlanets; i++) {
            const iX = unstackedX[i];
            const iV = unstackedV[i];
            const vels = Array.from(iV.dataSync())
            const initialValue = 0;
            const velocitySquare = vels.map(vel => vel**2).reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            )

            for (let j = i + 1; j < numberOfPlanets; j++) {
                const jX = unstackedX[j];
                const vector = tf.sub(jX, iX);
                const r = tf.norm(vector);
                const rij = Math.sqrt(Array.from(vector.dataSync()).map(vel => vel**2).reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    initialValue
                ))

                const force = G.mul(masses[i]) // todo laws of physic
                    .mul(masses[j])
                    .div(tf.pow(r, 3))
                    .mul(vector);
                accelerations[i] = accelerations[i].add(force);
                accelerations[j] = accelerations[j].sub(force);

                Ep += GConst * masses[i] * masses[j] / rij
            }

            // definePotentialEnergy()

            Ek += masses[i] * velocitySquare / 2

            accelerations[i] = accelerations[i].div(masses[i]);
        }

        setSystemIndicators({
            kineticEnergy: Ek,
            potentialEnergy: Ep,
            systemEnergy: Ek + Ep
        })


        console.log({Ek: Ek, Ep: Ep})

        // setSystemIndicators({
        //     kineticEnergy: Ek,
        //     potentialEnergy: Ep,
        //     systemEnergy: Ek + Ep
        // })

        return tf.stack(accelerations);
    }

    return (
        <group>
            <orbitControls args={[camera]} />
            <ambientLight />
            <pointLight />

            {pos.map((ppos, i) => {
                return (
                    <mesh key={`planet-${i}`} position={ppos}>
                        <sphereBufferGeometry
                            args={[planets[i].r * 800, 30, 30]}
                            attach="geometry"
                        />
                        <meshStandardMaterial
                            color={planets[i].color}
                            attach="material"
                        />
                    </mesh>
                );
            })}
            {traj.map((points, i) => {
                return (
                    <line key={`line-${i}`}>
                        <geometry
                            attach="geometry"
                            vertices={points.map(point => new Vector3(...point))}
                            onUpdate={handleUpdateGeometry}
                        />
                        <lineBasicMaterial
                            color={planets[i].color}
                            attach="material"
                        />
                    </line>
                );
            })}
        </group>
    );
}
