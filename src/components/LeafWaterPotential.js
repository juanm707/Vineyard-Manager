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
            labels: ['6/1/2020', '6/8/2020', '6/15/2020', '6/22/2020', '6/29/2020', '7/6/2020', '7/13/2020',
                '7/20/2020', '7/27/2020', '8/3/2020', '8/10/2020', '8/17/2020', '8/24/2020'],
            datasets: [
                {
                    label: 'Block 1',
                    borderColor: 'rgb(35,32,144)',
                    backgroundColor: 'rgb(0,0,0,0.0)',
                    data: [10, 11, 9, 7, 8, 10, 11, 10, 11, 12, 10, 13, 12, 11]
                },
                {
                    label: 'Block 2',
                    borderColor: 'rgb(0,127,57)',
                    backgroundColor: 'rgb(0,0,0,0.0)',
                    data: [11, 12, 13, 10, 12, 11, 10, 11, 10, 8, 7, 9, 11, 10]
                },
                {
                    label: 'Block 3',
                    borderColor: 'rgb(245,129,37)',
                    backgroundColor: 'rgb(0,0,0,0.0)',
                    data: [7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6]
                },
                {
                    label: 'Target',
                    borderColor: 'rgb(255,6,6)',
                    backgroundColor: 'rgb(0,0,0,0.0)',
                    data: [7, 9, 9, 11, 8, 10, 12, 10, 11, 13, 10, 12, 12, 11],
                    borderDash: [10,5]
                }
            ]
        },
        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Pressure'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            }
        }
    });
}

export default LeafWaterPotentialChart;