import '../App.css';
import Chart from 'chart.js';
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const LeafWaterPotentialChart = (mapInit, {setOptions, vineyardToBeDisplayed}) => {

    if (mapInit) {
        document.getElementById('map').style.display = 'none';
        document.getElementsByTagName('button')[0].style = "";
        setOptions([true, true, false]);
    } else {
        setOptions([false, true, false]);
    }

    document.getElementsByClassName('chart-container')[0].style.display = 'block';
    document.getElementById('lwpChart').style.display = 'block';
    var ctx = document.getElementById('lwpChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                borderColor: 'rgb(35,32,144)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false
        }
    });
}

export default LeafWaterPotentialChart;