import React, {useState} from "react";
import ReactDOM from "react-dom";
import BodyPart from "./BodyPart";
import MenuContainer from "./MenuContainer";


function App() {
    const [start, setStart] = useState(false)
    const [props, setProps] = useState({G: 2.95912208286e-4, step: 100, tailInaccuracy: 2})
    const [planets, setPlanets] = useState([])
    const [systemIndicators, setSystemIndicators] = useState({kineticEnergy: 0, potentialEnergy: 0, systemEnergy: 0})

    return (
        <div className="App">
            {start
                ?
                <BodyPart planets={planets} constants={props} systemIndicators={systemIndicators}
                          setSystemIndicators={setSystemIndicators}/>
                :
                <div className="MenuPart">
                    <MenuContainer planetsState={[planets, setPlanets]} propsState={[props, setProps]} start={start}/>
                </div>
            }
            {/*<BodyPart startState={[start, setStart]} planets={planets}/>*/}
            {/*<div className="MenuPart">*/}
            {/*    <MenuContainer planetsState={[planets, setPlanets]} propsState={[props, setProps]}/>*/}
            {/*</div>*/}
            <button style={{position: "absolute", bottom: "0", width: "20%", height: "60px"}}
                    onClick={() => setStart(!start)}>
                {start ? "Stop" : "Start"}
            </button>

            {start ?
                <div style={{position: "absolute", left: "22%", bottom: "30px", width: "20%", height: "20px"}}>
                    <label style={{color: "white"}}>Kinetic energy</label><input type={"number"} readOnly={true}
                                                        value={systemIndicators.kineticEnergy}/>
                </div> : <div/>
            }
            {start ?
                <div style={{position: "absolute", left: "44%", bottom: "30px", width: "20%", height: "20px"}}>
                    <label style={{color: "white"}}>Potential energy</label><input type={"number"} readOnly={true}
                                                          value={systemIndicators.potentialEnergy}/>
                </div> : <div/>
            }
            {start ?
                <div style={{position: "absolute", left: "66%", bottom: "30px", width: "20%", height: "20px"}}>
                    <label style={{color: "white"}}>System energy</label><input type={"number"} readOnly={true}
                                                       value={systemIndicators.systemEnergy}/>
                </div> : <div/>
            }
        </div>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
