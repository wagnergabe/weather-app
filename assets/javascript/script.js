

/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');
var cardEl = document.getElementById('card')
var apiKey= "649cad07f48dfced963391132fc3e4be"
var mainCardEl = document.getElementById('weatherStats');
var sunnyEl = document.getElementById('sun');
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var cityListEl = document.getElementById('cityList');
historyEl = []


/*click function */
searchBtnEl.addEventListener("click", getCities) 

function getCities() {
   
/*New City Button */
    
    var cityName = document.getElementById('citySearch').value;

    localStorage.setItem("citySave", JSON.stringify(cityName) )

    var cityBtn = document.createElement('button')
    cityBtn.textContent = cityName.toUpperCase();
    historyEl.push(cityBtn)
    cityListEl.appendChild(cityBtn);


    
/*Api Call */

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

/*main card element */

            console.log(data);
            var displayDate = document.createElement('h2');
            displayDate.textContent = data.name + " " + moment().format('L');
            mainCardEl.appendChild(displayDate);

            var temperature = document.createElement('li');
            temperature.textContent ="Temperature: " + data.main.temp + "°F";
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
            var uviURL= `https://api.openweathermap.org/data/2.5/onecall?cnt=5&lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
                fetch(uviURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

    /*UV Index */

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
            

    /* 5 Day forecast */

                    for (var i = 0; i < data.daily.length - 3; i++) {

                    
                    var forecastCards = document.createElement('div')
                    
                    var weatherCard = document.createElement('div')
                    weatherCard.className = "card"

                    var card = document.createElement('div')
                    card.className = "card-body"

                    var cardName = document.createElement('h2')
                    cardName.className = moment();

                    //discovered that "dt" in the API data is a timestamp "Time of data forecasted, unix, UTC" and its value is in milliseconds. multiply it by 1000 and it should represent the current time
                    //working on Moment().unix to pass dt as a string and it should return the proper dates
                   
    
                    var forecastDate = document.createElement('li');
                    forecastDate.textContent = "date" + moment.unix(data.daily[i].dt).format('l');
                    forecastEl.appendChild(forecastDate);
                    
                    var forecastTemp = document.createElement('li');
                    forecastTemp.textContent ="Temperature:" + data.daily[i].temp.day + "°";
                    forecastEl.appendChild(forecastTemp);

                    var wind = document.createElement('li');
                    wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    forecastEl.appendChild(wind);

                    var humidity = document.createElement('li');
                    humidity.textContent = "humidity: " + data.daily[i].humidity + "%";
                    forecastEl.appendChild(humidity);

                    var icon = document.createElement('img');
                    icon.src = "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                    forecastEl.appendChild(icon);

                    card.appendChild(cardName)
                    card.appendChild(forecastDate);
                    card.appendChild(forecastTemp)
                    card.appendChild(wind);
                    card.appendChild(forecastDate);
                    card.appendChild(humidity)
                    card.appendChild(icon)
                    weatherCard.appendChild(card)
                    forecastCards.appendChild(weatherCard)
                    forecastEl.appendChild(weatherCard)

                    /*Source that helped creating cards, Originally tried making different classnames in the HTML for each day, but end-result was far from desired outcome*/
                    /*https://youtu.be/zikLN9XHy4I*/
                    
                    }
                    })
                })
            }                                   