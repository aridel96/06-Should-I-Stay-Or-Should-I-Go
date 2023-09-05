var weatherKey = '02c47388259616ad39c57739369c2864';
var latitude
var longitude
var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherKey}';

var geoKey
var city = document.getElementById("city")
var state
var limit = 5
var geoCodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}';

var title = document.querySelector('h1');
var button = document.querySelector('button');

function getWeather(city) {
    fetch(weatherAPI)
    .then(function(data) {
        console.log(data)


        fetch(geoCodingAPI)
        .then(function() {
            document.location.replace = "./results.html"
            title.textContent = city
        
        })





        
    })

}



button.addEventListener('click', getWeather(city))