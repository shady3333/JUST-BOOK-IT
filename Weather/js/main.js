//header("Access-Control-Allow-Origin: https://api.darksky.net");


var latitude = 25.59;
var longitude = 85.13;
var temperature = 25;
var cityContainer = document.getElementById('city');
var countryContainer = document.getElementById('country');
var summaryContainer = document.getElementById('summary');
var tempCurContainer = document.getElementById('temp-cur');
var windSpeedContainer = document.getElementById('wind-speed');
var pressureContainer = document.getElementById('pressure');
var humidityContainer = document.getElementById('humidity');
var blankContainer = document.getElementById('blank');
var blank1Container = document.getElementById('blank1');
var btn = document.getElementById('btn');
const apikey = '27461d73efc69dbccee98de547b60991';

function getWeather(user_lat,user_long){

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://fcc-weather-api.glitch.me/api/current?lon=' + user_long + '&lat=' + user_lat);
    ourRequest.onload = function(){
    
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
          
    };

    ourRequest.onerror = function(){
        console.log("Connection error");
    }

    ourRequest.send();

    //console.log('getWeather ran');
};

function getCurrentWeather(){
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = (position.coords.latitude);
        longitude = (position.coords.longitude);
        getWeather(latitude,longitude);
    })
};
    
function renderHTML(data){

    // console.log(data.name);
    // console.log(data.coord.lat);
    // console.log(latitude.toFixed(2));
    // console.log(data.coord.lon);
    // console.log(longitude.toFixed(2));

    if (data.coord.lat.toFixed(0) - latitude.toFixed(0) < 10 && data.coord.lon.toFixed(0) - longitude.toFixed(0) < 10){
      
        cityContainer.innerHTML = data.name + ', ' + data.sys.country;
        summaryContainer.innerHTML = data.weather[0].main;
        
        
        temperature = (data.main.temp);
        if(document.getElementById('deg-fah').checked == true){
            //console.log('fah');
            tempCurContainer.innerHTML = 'Temp <i class="fa fa-thermometer"></i> = ' + (((temperature)*9/5)+32).toFixed(1) + '° F';
        }
        else{
            //console.log('cel');
            tempCurContainer.innerHTML = 'Temp <i class="fa fa-thermometer"></i> = ' + (temperature).toFixed(1) + '° C';
        }

        windSpeedContainer.innerHTML = 'Wind Speed = ' + data.wind.speed + ' Km/hr';
        pressureContainer.innerHTML = 'Pressure <i class="fa fa-tachometer"></i> = ' + data.main.pressure + ' mbar';
        humidityContainer.innerHTML = 'Humidity <i class="fa fa-tint"></i> = ' + data.main.humidity + '%';
        blankContainer.innerHTML = "";
        blank1Container.innerHTML = "";

        var col = getRandomColor();
        document.getElementById('body-main').style.backgroundColor = getRandomColor();
        document.getElementById('input-lat').style.backgroundColor = col;
        document.getElementById('input-lon').style.backgroundColor = col;

        //console.log('renderHTML if codes ran');
    }
    else{
        //alert('Please try again.')
        //getCurrentWeather();
        getWeather(latitude,longitude);
    }

    //console.log('renderHTML ran');
}

function getSpecificWeather(){
    if (document.getElementById('input-lat').value == "" || document.getElementById('input-lon').value == ""){
        //console.log("no value");
        alert('Enter required fields');
    }
    else{
        latitude = parseFloat(document.getElementById('input-lat').value);
        longitude = parseFloat(document.getElementById('input-lon').value);
        getWeather(document.getElementById('input-lat').value,document.getElementById('input-lon').value)
    }

    //console.log('getSpecificWeather ran');
    
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var radios = document.forms["formA"].elements["temp-degree"];
//radios = document.elements["temp-degree"]
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        // alert(this.value);
        if (this.value == 'fahrenheit'){
            tempCurContainer.innerHTML = 'Temp <i class="fa fa-thermometer"></i> = ' + (((temperature)*9/5)+32).toFixed(1) + '° F';
        }else{
            tempCurContainer.innerHTML = 'Temp <i class="fa fa-thermometer"></i> = ' + (temperature).toFixed(1) + '° C';
        }
    }
}