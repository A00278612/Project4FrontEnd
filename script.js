var $ = function (id) { return document.getElementById(id); };

const getData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       buildTable(this.responseText);
       displayChart(this.responseText);
      }
    };
    xhttp.open("GET", "https://stark-garden-31406.herokuapp.com/", true);
    xhttp.send();
};

const buildTable = data => {
    JSONdata = JSON.parse(data);
    lastItem = JSONdata.pop();
    const {dth11error,soil,humidity,temperature,dateofdata} = lastItem;
    $("table").innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Current Plant Stats</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Status</td>
                <td>${dth11error}</td>
            </tr>
            <tr>
                <td>Soil Moisture</td>
                <td>${soil}</td>
            </tr>
            <tr>
                <td>Soil Moisture</td>
                <td>${humidity}</td>
            </tr>
            <tr>
                <td>Soil Moisture</td>
                <td>${temperature}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Time of Data</td>
                <td> ${dateofdata}</td>
            </tr>
        </tfoot>
   </table>`
}

function displayChart(data) {
    JSONdata = JSON.parse(data);
    xLabels= [];
    tempData = [];
    soilData = [];
    humidityData = [];
    var ctx = document.getElementById('myChart').getContext('2d');
    JSONdata.forEach(element => {
        xLabels.push(element.dateofdata)
    });
    JSONdata.forEach(element => {
        tempData.push(element.temperature)
    });
    JSONdata.forEach(element => {
        soilData.push(element.soil)
    });
    JSONdata.forEach(element => {
        humidityData.push(element.humidity)
    });
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: xLabels,
            datasets: [{
                label: 'Temperature',
               
                borderColor: 'rgb(255, 99, 132)',
                data: tempData
            },
            {
                label: 'Soil Moisture',
               
                borderColor: 'rgb(0,0,255)',
                data: soilData
            },
            {
                label: 'humidity',
                
                borderColor: 'rgb(0,128,0)',
                data: humidityData
            }]
        },
    
        // Configuration options go here
        options: {}
    });
  };

  window.onload = () => {
    getData();
    console.log("i am here")
  };