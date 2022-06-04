/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');


/*API Fetch*/ 

searchBtnEl.addEventListener("click", getCities) 
function getCities() {
    var APIkey = "649cad07f48dfced963391132fc3e4be"
    /*Chicago test*/ 
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=649cad07f48dfced963391132fc3e4be"
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
};