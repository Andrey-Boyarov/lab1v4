import React, {useState} from "react";

export default function Constants({propsState: [props, setProps], dDState}){


    const updateG = (val) => setProps({G: val, step: props.step, tailInaccuracy: props.tailInaccuracy})
    const updateStep = (val) => setProps({G: props.G, step: val, tailInaccuracy: props.tailInaccuracy})
    const updateTailInaccuracy = (val) => setProps({G: props.G, step: props.step, tailInaccuracy: val})

    return(
        <div className="Constants" hidden={dDState !== 'Constants'}>
            <label  hidden={dDState !== 'Constants'}className={"MenuLabel"} >G</label>
            <input  hidden={dDState !== 'Constants'}className={"MenuField"} type="number" value={props.G} onChange={e => updateG(+e.target.value)}/>
            <label  hidden={dDState !== 'Constants'}className={"MenuLabel"} >Step</label>
            <input  hidden={dDState !== 'Constants'}className={"MenuField"} type="number" value={props.step} onChange={e => updateStep(+e.target.value)}/>
            <label  hidden={dDState !== 'Constants'}className={"MenuLabel"} >Tail inaccuracy (integer, 1 is maximum accuracy, more for less)</label>
            <input  hidden={dDState !== 'Constants'}className={"MenuField"} type="number" value={props.tailInaccuracy} onChange={e => updateTailInaccuracy(+e.target.value)}/>
        </div>
    )
}