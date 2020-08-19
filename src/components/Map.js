import '../App.css';
import L from 'leaflet';
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";


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

    var drawControl = new L.Control.Draw({
        draw: {
            polyline: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            polygon: {
                shapeOptions: {
                    color: 'orange'
                }
            }
        }
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function f(e) {
        //add to database? the coords
        map.addLayer(e.layer);
    });

    // var drawnItems = new L.FeatureGroup();
    // console.log('Drawn Items', drawnItems);
    //
    // map.addLayer(drawnItems);
    // var drawControl = new L.Control.Draw({
    //     edit: {
    //         featureGroup: drawnItems
    //     }
    // });
    // console.log('drawControl', drawControl);
    // map.addControl(drawControl);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution:  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // "<table><tr><td>Cell 1</td></tr><tr><td>Cell 2</td></tr></table>"

    L.marker(vineyardCoords).addTo(map)
        .bindPopup(`<table><tr><td>${vineyardToBeDisplayed.name}</td><tr><td>(${vineyardCoords.toString()})</td></tr></table>`)
        .openPopup();

    const blocks = vineyardToBeDisplayed.blocks;
    blocks.forEach(b => {
       var p = L.polygon(coordsToArray(b.coords), {
           color: 'orange',
           fillColor: 'orange',
           fillOpacity: 0.3
       }).addTo(map);
       p.on('click', (event) => onPolygonClick(event, b));
       
       const blockInfo = `<table><tr><td>Block:</td><td>${b.name}</td></tr><tr><td>Variety:</td><td>${b.variety}</td></tr><tr><td>Root-stock:</td><td>${b.rootstock}</td><tr><td>Spacing:</td><td>${b.spacing}</td></tr><tr><td>Acres:</td><td>${b.acres}</td></tr><tr><td>Vines:</td><td>${b.vines}</td></tr><tr><td>Rows:</td><td>${b.rows}</td></tr><tr><td>Num. of Sensors:</td><td>${b.sensors.length}</td></tr></table>`;
       p.bindPopup(blockInfo, {
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