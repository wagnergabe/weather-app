/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');
var cardEl = document.getElementById('card')
var apiKey= "649cad07f48dfced963391132fc3e4be"
var mainCardEl = document.getElementById('weatherStats');
var sunnyEl = document.getElementById('sun');
var forecastEl = document.getElementById('forecast');
/*API Fetch*/ 


function getCities() {
    
    /*Need to provide city name, date, icon for weather cond. */
    /*Temperature (temp), Humidity (humidity), wind speed(wind_speed), UV Index(uvi)*/ 
    /*Onecall api having trouble finding city*/ 
    var cityName = document.getElementById('citySearch').value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

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

            /*Ran into a little bit of a paradox with the "onecall" and "weather" calls. "onecall" needs city geolocation(lat and lon) while "weather" can be called with city name, but doesnt supply UV index. */
            /* Seems like a contrived approach, but two calls to the api (one for the main temp data, and city location) followed by a call entering discovered "lat and lon" eventually worked*/
            var uviURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
                fetch(uviURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                console.log(data)
                //uvi index  source : https://www.animassurgical.com/the-uv-index-and-why-you-should-care-about-it/
                var uvi = document.createElement('li');
                uvi.textContent = "UV Index: " + data.current.uvi;
                mainCardEl.appendChild(uvi);
                if (data.current.uvi < 2)
                    uvi.style.color = 'green';
                if (data.current.uvi > 2 && data.current.uvi < 7)
                    uvi.style.color = "orange";
                if (data.current.uvi > 7)
                    uvi.style.color = "red";
            })

            var fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=imperial`
                fetch(fiveDayURL)
                .then(function (response){
                    return response.json();
                })
                    .then(function(data) {
         

                    for (var i = 0; i < data.list.length; i++) {
                    
                    
                    var wind = document.createElement('li');
                    wind.textContent = data.list[i].wind.speed;
                    forecastEl.appendChild(wind);
  
                    }
                    })
                
            

            
            

            // var uvIndex = document.createElement('li');
            // uvIndex.textContent = "UV Index: " + data.current.uvi;
            // card.appendChild(uvIndex);
            

        })
};
searchBtnEl.addEventListener("click", getCities) 