/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');
var cardEl = document.getElementById('card')
var apiKey= "649cad07f48dfced963391132fc3e4be"


/*API Fetch*/ 


function getCities() {
    /*Chicago test*/ 
    /*Need to provide city name, date, icon for weather cond. */
    /*Temperature (temp), Humidity (humidity), wind speed(wind_speed), UV Index(uvi)*/ 
    var cityName = document.getElementById('citySearch').value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=649cad07f48dfced963391132fc3e4be&units=imperial`
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);

            var temperature = document.createElement('li');
            temperature.textContent ="Temperature: " + data.main.temp + " degrees F";
            card.appendChild(temperature);

            var humidity = document.createElement('li');
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            card.appendChild(humidity);

            var windSpeed = document.createElement('li');
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            card.appendChild(windSpeed);

            // var uvIndex = document.createElement('li');
            // uvIndex.textContent = "UV Index: " + data.current.uvi;
            // card.appendChild(uvIndex);
            

        })
};
searchBtnEl.addEventListener("click", getCities) 