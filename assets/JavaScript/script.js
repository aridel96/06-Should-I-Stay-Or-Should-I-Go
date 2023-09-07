var weatherKey = 'ad8e412062cd1ab247bb3df3edb96e41';                    // API key
var latitude                                                            // API Url Parameters
var longitude

var geoKey

var cityEl = document.getElementById("city"); 
var countryEl = document.getElementById("country")

var city
var country

var limit = 5

var unitedStates = "US"
var usCodes = [                                 // List of US State codes for the openWeather's GeoCoding API
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", 
    "NY", "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", 
    "VI", "WA", "WV", "WI"
]

var title = document.querySelector('h1');
var button = document.querySelector('button');

function getWeather(city) {
    city = cityEl.value;
    country = countryEl.value
    console.log(city + ", " + country)

    if(usCodes.includes(country)){
        var geoCodingAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country},${unitedStates}&limit=${limit}&appid=${weatherKey}`;         // GeoCoding API - Provide latitude and longtitude when provided city, state and country code
    }

    else {
        var geoCodingAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${weatherKey}`;         
    }
    
    fetch(geoCodingAPI)
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            latitude = data[0].lat; 
            longitude = data[0].lon;

            var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`;       // OpenWeather API URL

            console.log(weatherAPI);

            fetch(weatherAPI)
                .then(function() {
                    document.location.href = "./results.html"
                    title.textContent = city + " " + country;

                    console.log(city);
                
            })





        
    })

}


console.log(window.location.href.split('/')[2])


if (window.location.href.split('/')[2] == 'index.html') {
    button.addEventListener('click', function() {
        getWeather(city)
    })
}