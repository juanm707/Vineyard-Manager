import '../App.css';
import L from 'leaflet';
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const sensorIcon = 'https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_60,h_60/https://dashboard.snapcraft.io/site_media/appmedia/2018/11/indicator-sensors_r8EdpLP.png';
const warnIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Page_issue_icon_-_medium.svg/200px-Page_issue_icon_-_medium.svg.png';
var blockInfoShown = false;
var warningMarker = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12.5, 12.5),
        iconSize: new L.Point(20, 20),
        popupAnchor: new L.Point(0, -41),
        iconUrl: warnIcon
    }
});

var sensorMarker = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12.5, 41),
        iconSize: new L.Point(25, 41),
        popupAnchor: new L.Point(0, -41),
        iconUrl: sensorIcon
    }
});

const Map = (mapInit, {setOptions, vineyardToBeDisplayed}) => {

    document.getElementsByClassName('chart-container')[0].style.display = 'none';
    document.getElementsByClassName('blueTable')[0].style.display = 'none';
    document.getElementsByTagName('button')[0].style = "background-color: #77d42a; border-radius: 6px; " +
        "border: 1px solid #268a16; cursor: pointer; color: #306108; " +
        "font-family: Arial; font-size: 15px; font-weight: bold; " +
        "text-decoration: none; text-shadow: 0px 1px 0px #aade7c; box-shadow: inherit";

    if (mapInit) {
        setOptions([true, false, false]);
        document.getElementById('map').style.display = 'block';
        return;
    }

    setOptions([true, false, false]);

    var bToV = document.getElementById('backBtn');
    bToV.style.float = 'left';

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
            },
            marker: {
                icon: new warningMarker()
            }
        }
    });

    // Set the button title text for the polygon button
    L.drawLocal.draw.toolbar.buttons.marker = 'Add a notice';
    L.drawLocal.draw.toolbar.buttons.polygon = 'Add a new block'

    // Set the tooltip start text for the rectangle
    L.drawLocal.draw.handlers.polygon.tooltip.start = 'Click to start outlining new block';

    map.addControl(drawControl);

    // On layer creation
    map.on(L.Draw.Event.CREATED, function f(e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A warning/issue/notice!');
        }
        //add to database? the coords
        map.addLayer(layer);
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

    // main tile layers, satellite, and names of cities and streets
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution:  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // center vineyard marker
    L.marker(vineyardCoords).addTo(map)
        .bindPopup(`<table><tr><td>${vineyardToBeDisplayed.name}</td><tr><td>(${vineyardCoords.toString()})</td></tr></table>`)
        .openPopup();

    // adding blocks to map
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

    // adding sensors to map, in marker pane to hide markers? like check box options
    let sensors = [];
    blocks.forEach(bl => {
        bl.sensors.forEach(s => {
            sensors = sensors.concat(s);
        });
    });

    sensors.forEach(s => {
        var sensOnMap = L.marker([s.coords.lat, s.coords.lng], {
            icon: new sensorMarker()
        }).addTo(map);

        const sensorText = `Temperature: ${s.temperature}° | Humidity: ${s.humidity}%`;
        sensOnMap.bindPopup(sensorText, {
            keepInView: true
        });
    });

    // add warning icon to map
    var warnMark = L.marker([38.565626,-122.565143], {
        icon: new warningMarker()
    }).addTo(map)
        .bindPopup('This is an example of an issue, broken pipe, diseases, other icons can be used.', {
            keepInView: true
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