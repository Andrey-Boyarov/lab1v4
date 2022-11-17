import React, {useEffect, useState} from "react";

export default function PlanetMenu({id, planets, setPlanets}) {

    const stateInMenus = planets.filter(obj => obj.id === id)[0]

    const [m, setM] = useState(stateInMenus.m)
    const [x, setX] = useState(stateInMenus.x)
    const [y, setY] = useState(stateInMenus.y)
    const [z, setZ] = useState(stateInMenus.z)
    const [vx, setVx] = useState(stateInMenus.vx)
    const [vy, setVy] = useState(stateInMenus.vy)
    const [vz, setVz] = useState(stateInMenus.vz)
    const [color, setColor] = useState(stateInMenus.color)

    const deleteIt = () => {
        setPlanets([...planets.filter(obj => obj.id !== id)])
    }

    const replaceElement = () => {
        const index = planets.findIndex(obj => obj.id === id)
        const newArray = [...planets]
        newArray[index] = {id, m: m, x: x, y: y, z: z, vx: vx, vy: vy, vz: vz, r: 0.005, color}
        setPlanets(newArray)
    }

    useEffect(replaceElement, [m, x, y, z, vx, vy, vz])

    const [test, setTest] = useState(10)

    return (
        <form className="PlanetMenu" style={{display: "flex", flexDirection: "column", marginTop: "20px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "gray", borderRadius: "4px"}}>
            <div style={{display: "flex", flexDirection: "row", marginTop: "20px", marginBottom: "20px"}}>
                <button style={{width: "10%"}} onClick={deleteIt}>Delete</button>
                <label style={{width: "10%"}}>Mass</label>
                <input style={{width: "80%"}}type="number" value={m} onChange={e => setM(+e.target.value)}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", marginTop: "20px", marginBottom: "20px"}}>
                <label style={{width: "10%"}}>X</label>
                <input style={{width: "20%"}}type="number" value={x} onChange={e => setX(+e.target.value)}/>
                <label style={{width: "10%"}}>Y</label>
                <input style={{width: "20%"}}type="number" value={y} onChange={e => setY(+e.target.value)}/>
                <label style={{width: "10%"}}>Z</label>
                <input style={{width: "20%"}}type="number" value={z} onChange={e => setZ(+e.target.value)}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", marginTop: "20px", marginBottom: "20px"}}>
                <label style={{width: "15%"}}>Acceleration X</label>
                <input style={{width: "15%"}}type="number" value={vx} onChange={e => setVx(+e.target.value)}/>
                <label style={{width: "15%"}}>Acceleration Y</label>
                <input style={{width: "15%"}}type="number" value={vy} onChange={e => setVy(+e.target.value)}/>
                <label style={{width: "15%"}}>Acceleration Z</label>
                <input style={{width: "15%"}}type="number" value={vz} onChange={e => setVz(+e.target.value)}/>
            </div>
        </form>
    )
}

/*

            <input type="text" value={name} onChange={e => name = e.target.value}/>
            <button onClick={deleteIt}>Delete</button>
            <input type="text" value={m} onChange={e => m = e.target.value}/>
            <input type="text" value={x} onChange={e => x = e.target.value}/>
            <input type="text" value={y} onChange={e => y = e.target.value}/>
            <input type="text" value={z} onChange={e => z = e.target.value}/>
            <input type="text" value={vx} onChange={e => vx = e.target.value}/>
            <input type="text" value={vy} onChange={e => vy = e.target.value}/>
            <input type="text" value={vz} onChange={e => vz = e.target.value}/>
*/