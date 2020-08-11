import '../App.css';
import * as L from 'leaflet';

const sensorIcon = 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_60,h_60/https://dashboard.snapcraft.io/site_media/appmedia/2018/11/indicator-sensors_r8EdpLP.png';
const warnIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Page_issue_icon_-_medium.svg/200px-Page_issue_icon_-_medium.svg.png';

const Map = ({setOptions, vineyardToBeDisplayed}) => {

    var mapDiv = document.getElementById('map');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '500px';

    setOptions([true, false, false])

    const vineyardCoords = [vineyardToBeDisplayed.vineCenterCoords.lat, vineyardToBeDisplayed.vineCenterCoords.lng];
    var map = L.map('map').setView(vineyardCoords, 17);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution:  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    L.marker(vineyardCoords).addTo(map)
        .bindPopup(vineyardToBeDisplayed.name)
        .openPopup();

    //console.log(vineyardToBeDisplayed);
    const blocks = vineyardToBeDisplayed.blocks;
    var polygon = L.polygon(coordsToArray(blocks[0].coords), {
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.5
    }).addTo(map);

    polygon.on('click', () => onPolygonClick(blocks[0]));

}

function onPolygonClick(block) {
    alert("You clicked the block " + block.name);
}

function coordsToArray(coordsObj) {
    return coordsObj.map(c => [c.lat, c.lng]);
}

export default Map;