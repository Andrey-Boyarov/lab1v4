import React, {useState} from "react";
import Constants from "./Constants";
import Planets from "./Planets";

export default function MenuContainer({propsState, planetsState}){
    const [dDState, setDDState] = useState('Constants')
    return(
        <div className="MenuContainer">
            <div className="ButtonContainer">
                <button className="MenuOption" onClick={() => setDDState('Constants')}>Constants</button>
                <button className="MenuOption" onClick={() => setDDState('Planets')}>Planets</button>
            </div>
            <div className="Characteristics">
                <header>{dDState}</header>
                <Constants propsState={propsState} dDState={dDState}/>
                <Planets planetsState={planetsState} dDState={dDState}/>
            </div>
        </div>
    )
}