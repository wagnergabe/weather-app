/* Element variables*/
var searchBtnEl = document.getElementById('searchBtn');


/*API Fetch*/ 

searchBtnEl.addEventListener("click", getCities) 
function getCities() {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=649cad07f48dfced963391132fc3e4be"

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
};