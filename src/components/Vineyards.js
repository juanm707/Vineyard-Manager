import React, {useState} from 'react';
import '../App.css';

const VineyardBox = ({vyData}) => {
    //console.log(vyData.vineyards[0].imgUrl);
    return (
        <div className="VineyardBox">
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

    console.log(vineyards);

    return (
      <div className="Vineyards">
          {vineyards.map((v, idx) => <VineyardBox key={v.name} vyData={v} />)}
      </div>
    );
}

export default Vineyards;