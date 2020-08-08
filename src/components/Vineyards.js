import React, {useState} from 'react';
import '../App.css';

const VineyardBox = ({vyData, displayVineyards}) => {
    //console.log(vyData.vineyards[0].imgUrl);
    const handleBoxClick = (event) => {
        // Console logs
        console.log(event);
        console.log(event.target);

        var vineyardListFadeTarget = document.getElementsByClassName("Vineyards")[0];
        //loginFadeTarget[0].style.opacity = 0;
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

    console.log(vineyards);

    if (displayVineyards) {
        return (
            <div className="Vineyards">
                {vineyards.map((v, idx) => <VineyardBox key={v.name} vyData={v} displayVineyards={setDisplayVineyards}/>)}
            </div>
        );
    } else {
        return null;
    }
}

export default Vineyards;