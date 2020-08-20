import React, {useState, useEffect} from 'react';
import '../App.css';
import Map from './Map';
import LeafWaterPotential from "./LeafWaterPotential";

const VineyardBox = ({vyData, displayVineyards, setV}) => {
    //console.log(vyData.vineyards[0].imgUrl);
    const handleBoxClick = (event) => {
        // Console logs
        // console.log(event);
        // console.log(event.target);

        var vineyardListFadeTarget = document.getElementsByClassName("Vineyards")[0];

        var fadeEffect = setInterval(() => {
            if (!vineyardListFadeTarget.style.opacity) {
                vineyardListFadeTarget.style.opacity = 1;
            }
            if (vineyardListFadeTarget.style.opacity > 0) {
                vineyardListFadeTarget.style.opacity -= 0.04;
            } else {
                clearInterval(fadeEffect);
                displayVineyards(false);
            }
        }, 50);

        setV(vyData);
        console.log(vyData);
    }

    return (
        <div className="VineyardBox" onClick={handleBoxClick} style={{cursor: 'pointer'}}>
            <div className="VineyardBox-Img">
                <img src={vyData.imgUrl} alt={vyData.name + "Vineyard"}/>
            </div>
            <div className="VineyardBox-Text">
                <p id='VineyardName'>{vyData.name}</p>
                <p>T: {vyData.blocks[0].sensors[0].temperature}° | H: {vyData.blocks[0].sensors[0].humidity}%</p>
                <p>{(new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

const Vineyards = ({vineyardData}) => {

    const [vineyards, setVineyards] = useState(vineyardData.vineyards);
    const [displayVineyards, setDisplayVineyards] = useState(true);

    const [vineyardToBeDisplayed, setVineyardToBeDisplayed] = useState(null);
    const [options, setOptions] = useState([false, false, false]); //map, lwp, ce

    const greenSelectedStyle = {
        backgroundColor: "#77d42a",
        borderRadius: "6px",
        border: "1px solid #268a16",
        cursor: "pointer",
        color: "#306108",
        fontFamily: "Arial",
        fontSize: "15px",
        fontWeight: "bold",
        textDecoration: "none",
        textShadow: "0px 1px 0px #aade7c",
        boxShadow: "inherit"
    }

    if (displayVineyards) {
        return (
            <div className="Vineyards">
                {vineyards.map((v, idx) => <VineyardBox key={v.name} vyData={v} displayVineyards={setDisplayVineyards} setV={setVineyardToBeDisplayed}/>)}
            </div>
        );
    } else {
        //let isTablet = window.matchMedia("screen and (max-width: 769px)").matches;
        //console.log(isTablet);

        const backToVineyards = () => {
            setDisplayVineyards(true);
            setOptions([false, false, false]);
            setVineyardToBeDisplayed(null);
        }

        // WHY DOES OPACITY TO CHANGE TO 0 IN fadeEffect FUNC ABOVE?! HAVE TO STYLE IT...
        return (
            <div className="VineyardInfoBox" style={{opacity: 1}}>
                <div className="VineyardInfoBox-Header">
                    <h2>{vineyardToBeDisplayed.name}</h2>
                    <div className="VineyardInfoBox-Buttons">
                        <button type="submit" style={options[0] ? greenSelectedStyle : null}
                                onClick={() => Map(options[0], {setOptions, vineyardToBeDisplayed})}>Map</button>
                        <button type="submit" style={options[1] ? greenSelectedStyle : null}
                                onClick={() => LeafWaterPotential(options[0], {setOptions, vineyardToBeDisplayed})}>Leaf Water Potentials</button>
                        <button type="submit" style={options[2] ? greenSelectedStyle : null}
                                onClick={() => setOptions([false, false, true])}>Crop Estimates</button>
                    </div>
                </div>
                <div id='map'/>
                <div className="chart-container" style={{position: "relative", height: "500px", width: "100%", display: "none"}}>
                    <canvas id='lwpChart' style={{display: "none"}}/>
                </div>
                <button id="backBtn" className="BackButton" onClick={() => {backToVineyards()}}>Back to vineyards</button>
            </div>
        );
    }
}

export default Vineyards;