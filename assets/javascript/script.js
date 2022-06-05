/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');
var cardEl = document.getElementById('card')
var apiKey= "649cad07f48dfced963391132fc3e4be"
var mainCardEl= document.getElementById('weatherStats')


/*API Fetch*/ 


function getCities() {
    
    /*Need to provide city name, date, icon for weather cond. */
    /*Temperature (temp), Humidity (humidity), wind speed(wind_speed), UV Index(uvi)*/ 
    /*Onecall api having trouble finding city*/ 
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
            mainCardEl.appendChild(temperature);

            var humidity = document.createElement('li');
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            mainCardEl.appendChild(humidity);

            var windSpeed = document.createElement('li');
            windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            mainCardEl.appendChild(windSpeed);

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            console.log(lon, lat);

            var uviURL= (`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=649cad07f48dfced963391132fc3e4be`)
                fetch(uviURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                console.log(data)
                
                var uvi = document.createElement('li');
                uvi.textContent = data.uvi;
                mainCardEl.appendChild(uvi);
            })
            

            
            

            // var uvIndex = document.createElement('li');
            // uvIndex.textContent = "UV Index: " + data.current.uvi;
            // card.appendChild(uvIndex);
            

        })
};
searchBtnEl.addEventListener("click", getCities) 