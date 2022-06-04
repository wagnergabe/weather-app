/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');
var cardEl = document.getElementById('card')



/*API Fetch*/ 


function getCities() {
    /*Chicago test*/ 
    /*Need to provide city name, date, icon for weather cond. */
    /*Temperature (temp), Humidity (humidity), wind speed(wind_speed), UV Index(uvi)*/ 

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=649cad07f48dfced963391132fc3e4be"
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);

            var temperature = document.createElement('li');
            temperature.textContent = data.current.temp;
            card.appendChild(temperature);

            var humidity = document.createElement('li');
            humidity.textContent = "Humidity: " + data.current.humidity + "%";
            card.appendChild(humidity);

            var windSpeed = document.createElement('li');
            windSpeed.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
            card.appendChild(windSpeed);

            var uvIndex = document.createElement('li');
            uvIndex.textContent = "UV Index: " + data.current.uvi;
            card.appendChild(uvIndex);
            

        })
};
searchBtnEl.addEventListener("click", getCities) 