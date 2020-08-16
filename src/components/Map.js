import '../App.css';
import * as L from 'leaflet';

const sensorIcon = 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_60,h_60/https://dashboard.snapcraft.io/site_media/appmedia/2018/11/indicator-sensors_r8EdpLP.png';
const warnIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Page_issue_icon_-_medium.svg/200px-Page_issue_icon_-_medium.svg.png';
var blockInfoShown = false;

const Map = (mapInitialized, {setOptions, vineyardToBeDisplayed}) => {

    if (mapInitialized) return;

    var addBB = document.getElementById('AddBlockButton');
    addBB.style.display = 'block';

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
    blocks.forEach(b => {
       var p = L.polygon(coordsToArray(b.coords), {
           color: 'orange',
           fillColor: 'orange',
           fillOpacity: 0.3
       }).addTo(map);
       p.on('click', (event) => onPolygonClick(event, b));
       const blockInfo = `Block: ${b.name}\nVariety: ${b.variety}\nRoot-stock: ${b.rootstock}\nSpacing: ${b.spacing}\nAcres: ${b.acres}\nVines: ${b.vines}\nRows: ${b.rows}\nNum. of Sensors: ${b.sensors.length}`;
       p.bindPopup(blockInfo, {
           maxWidth: 105,
           keepInView: true
       });
    });
}

function onPolygonClick(event, block) {

    if (event.target._path.getAttribute('stroke') === "orange") {
        // since its orange, we need to make blue, and make any blue, at most one, orange
        var polyBlocks = Array.from(document.getElementsByTagName('path'));
        polyBlocks.forEach(pb => {
            console.log(pb);
            pb.setAttribute('stroke', 'orange');
            pb.setAttribute('fill', 'orange');
        });

        event.target._path.setAttribute('stroke', 'purple');
        event.target._path.setAttribute('fill', 'purple');
    }
}

function coordsToArray(coordsObj) {
    return coordsObj.map(c => [c.lat, c.lng]);
}

export default Map;