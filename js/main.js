async function search (state) {
    var weatherApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b5e8dd76c1f2407fb1e81704232712&q=${state}&days=3`);


    if(weatherApi.ok && weatherApi.status !== 400) {
        var state = await weatherApi.json();
        displayCurrent(state.location, state.current),
        displayFuture(state.forecast.forecastday)
    }

}

document.getElementById("search").addEventListener("keyup", function(e){
    search(e.target.value);
});


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, currentWeather) {
    if(currentWeather !== null) {
        var e = new Date(currentWeather.last_updated.replace(" ", "T"));
        var n = `<div class="today forecast">
        <div class="forecast-header d-flex justify-content-between">
            <div class="day">${days[e.getDay()]}</div>
            <div class="date">${e.getDate() + " " + monthNames[e.getMonth()]}</div>
        </div>
        <div class="forecast-content">
            <div class="location">${location.name}</div>
            <div class="degree d-flex align-items-center">
                <div class="num">
                    ${currentWeather.temp_c}<sup>o</sup>C
                </div>
                <div class="forecast-icon ms-5">
                    <img src="https:${currentWeather.condition.icon}" width="90" alt="">
                </div>
            </div>
            <div class="custom">${currentWeather.condition.text}</div>
            <span>
                <img src="./imgs/icon-umberella.png" alt="">
                <span>${currentWeather.uv}%</span>
            </span>
            <span>
                <img src="./imgs/icon-wind.png" alt="">
                <span>${currentWeather.wind_kph}km/h</span>
            </span>
            <span>
                <img src="./imgs/icon-compass.png" alt="">
                <span>${currentWeather.wind_dir}</span>
            </span>
        </div>
    </div>`
    document.getElementById("forecast").innerHTML = n;
    }
}

function displayFuture(weather) {
    var forecast = "";
    for (var i = 1; i < weather.length; i++) {
        forecast += `<div class="forecast">
        <div class="forecast-header">
            <div class="day">${days[new Date(weather[i].date.replace(" ", "T")).getDay()]}</div>
        </div>
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${weather[i].day.condition.icon}" alt="">
                <div class="degree">${weather[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${weather[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${weather[i].day.condition.text}</div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("forecast").innerHTML += forecast;
}

search("cairo");
