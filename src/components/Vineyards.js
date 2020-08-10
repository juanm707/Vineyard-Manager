import React, {useState} from 'react';
import '../App.css';
import MapView from "./MapView";
import {Circle, Map, Marker, Polygon, Popup, TileLayer} from "react-leaflet";

const VineyardBox = ({vyData, displayVineyards, setV}) => {
    //console.log(vyData.vineyards[0].imgUrl);
    const handleBoxClick = (event) => {
        // Console logs
        // console.log(event);
        // console.log(event.target);

        var vineyardListFadeTarget = document.getElementsByClassName("Vineyards")[0];
        console.log('Faded class', vineyardListFadeTarget.className);

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

        setV(vyData.name);
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

    const [vineyardToBeDisplayed, setVineyardToBeDisplayed] = useState("");
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
        // WHY DOES OPACITY TO CHANGE TO 0 IN fadeEffect FUNC ABOVE?! HAVE TO STYLE IT...
        return (
            <div className="VineyardInfoBox" style={{opacity: 1}}>
                <h2>{vineyardToBeDisplayed}</h2>
                <div className="VineyardInfoBox-Buttons">
                    <button type="submit" style={options[0] ? greenSelectedStyle : null}
                            onClick={() => setOptions([true, false, false])}>Map</button>
                    <button type="submit" style={options[1] ? greenSelectedStyle : null}
                            onClick={() => setOptions([false, true, false])}>Leaf Water Potentials</button>
                    <button type="submit" style={options[2] ? greenSelectedStyle : null}
                            onClick={() => setOptions([false, false, true])}>Crop Estimates</button>
                </div>
                <Map className='map' center={[38.566336,-122.565644]} zoom={13}>
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'
                    />
                </Map>
            </div>
        );
    }
}

export default Vineyards;