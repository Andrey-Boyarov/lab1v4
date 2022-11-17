import {Canvas, extend, useThree} from "react-three-fiber";


import "./styles.css";
import React from "react";
import SolarSystem from "./SolarSystem";


export default function BodyPart({planets, constants, systemIndicators, setSystemIndicators}){
    return(
        <div className="BodyPart">
            <Canvas camera={{ position: [10, 0, 0] }}>
                <SolarSystem planetsInit={planets}
                             constants={constants}
                             systemIndicators={systemIndicators}
                             setSystemIndicators={setSystemIndicators}/>
            </Canvas>
        </div>
    )
}