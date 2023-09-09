var weatherKey = 'ad8e412062cd1ab247bb3df3edb96e41';                    // API key
var latitude                                                            // API Url Parameters
var longitude

var geoKey

var recentSearch = {}           // Object holding all recent searches for localstorage
var history
var searchResults 

var cityEl = document.getElementById("city"); 
var countryEl = document.getElementById("country")

var city
var country

var limit = 5
var count = 0               // counter to keep track of recent searches in recentSearch array

var unitedStates = "US"
var usCodes = [                                 // List of US State codes for the openWeather's GeoCoding API
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", 
    "NY", "NC", "ND", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", 
    "VI", "WA", "WV", "WI"
]

var button = document.querySelector('button');
var imageDiv = document.getElementById("image");
var divEl = document.getElementById("inputEl");
var header = document.getElementById('heading');
var icon;

function getWeather(city) {
    city = cityEl.value;                    
    country = countryEl.value
    // console.log(city + ", " + country)

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
 
            recentSearch[count] = city + ", " + country             // Sets count as the key and the city and state as the value for recentSearch object

            localStorage.setItem("search", JSON.stringify(recentSearch))        // Turn object to string to save in localstorage

            currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`
            

            fetch(currentWeatherAPI)
                .then(function(currentData) {
                    imageDiv.innerHTML = " ";               // Set elements innerHTML to blank to reset page
                    divEl.innerHTML = " ";
                    header.innerHTML = " ";

                    return currentData.json();
                })

                .then(function(currentWeather) {
                    // console.log(currentWeather);

                    divEl.classList = [];
                    divEl.classList.add("row", "pb-5");

                    header.innerHTML = `                
                        <h1></h1>
                        <a href="./index.html">
                            <i class="fa-solid fa-house"> Try Again?</i>
                        </a>`

                    var title = document.querySelector('h1');
                    title.textContent = currentWeather.name + ", " + country;

                    divEl.innerHTML =  `
                        <div class="card currentDate" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="crntDate"></h2>                   <!--Hook for current date-->
                                <img id="crntIcon" alt="weather icon"></img>                     <!--Hook for current weather icon-->
                                <p class="card-text" id="crntTemp">Temperature: </p>
                                <p class="card-text" id="crntHumidity">Humidity: </p>
                                <p id="crntWind">Wind Speeds: </p>
                            </div>
                        </div>

                        <div class="card" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="day1"></h2>
                                <img id="d1Icon" alt="weather icon"></img>
                                <p class="card-text" id="d1Temp">Temperature: </p>
                                <p class="card-text" id="d1Humidity">Humidity: </p>
                                <p id="d1Wind">Wind Speeds: </p>
                            </div>
                        </div>    

                        <div class="card" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="day2"></h2>
                                <img id="d2Icon" alt="weather icon"></img>
                                <p class="card-text" id="d2Temp">Temperature: </p>
                                <p class="card-text" id="d2Humidity">Humidity: </p>
                                <p id="d2Wind">Wind Speeds: </p>
                            </div>
                        </div>
                    
                        <div class="card" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="day3"></h2>
                                <img id="d3Icon" alt="weather icon"></img>
                                <p class="card-text" id="d3Temp">Temperature: </p>
                                <p class="card-text" id="d3Humidity">Humidity: </p>
                                <p id="d3Wind">Wind Speeds: </p>
                            </div>
                        </div>

                        <div class="card" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="day4"></h2>
                                <img id="d4Icon" alt="weather icon"></img>
                                <p class="card-text" id="d4Temp">Temperature: </p>
                                <p class="card-text" id="d4Humidity">Humidity: </p>
                                <p id="d4Wind">Wind Speeds: </p>
                            </div>
                        </div>

                        <div class="card" style="width: 18rem;">
                            <div class="card-body text-center">
                                <h2 id="day5"></h2>
                                <img id="d5Icon" alt="weather icon"></img>
                                <p class="card-text" id="d5Temp">Temperature: </p>
                                <p class="card-text" id="d5Humidity">Humidity: </p>
                                <p id="d5Wind">Wind Speeds: </p>
                            </div>
                        </div>`

                    var crntDate = document.getElementById('crntDate');
                    // crntDate.textContent =  CALL DAYJS API

                    var crntIcon = document.getElementById('crntIcon');
                    icon = currentWeather.weather[0].icon;
                    crntIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

                    var crntTemp = document.getElementById('crntTemp');
                    crntTemp.textContent = "Temperature: " + currentWeather.main.temp;

                    var crntHumidity = document.getElementById('crntHumidity');
                    crntHumidity.textContent = "Humidity: " + currentWeather.main.humidity;

                    var crntWind = document.getElementById('crntWind');
                    crntWind.textContent = "Wind Speeds: " + currentWeather.wind.speed

                    var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`;       // OpenWeather API URL
                
                    fetch(weatherAPI)
                        .then(function(weatherData) {
                            weather = weatherData.json();

                            return weather;                
                        })

                        .then(function(info) {
                            // console.log(info);

                            var day
                            var temp
                            var icon
                            var humidity
                            var windSpeed

                            var dateList = info.list
                            // console.log(dateList[0].dt_txt)

                            for (var i = 1; i > 6; i++) {
                                console.log("Hello!")

                                day = "day" + i;
                                icon = "d" + i + "Icon";
                                temp = "d" + i + "Temp";
                                humidity = "d" + "Humidity";
                                windSpeed = "d" + i + "Wind";

                                var date = document.getElementById(day);
                                var weatherIcon = document.getElementById(icon);
                                var temperature = document.getElementById(temp);
                                var humid = document.getElementById(humidity);
                                var wind = document.getElementById(windSpeed);

                                for(var a = 0; a > dateList.length; a++) {
                                    console.log(dateList[a].dt_txt)
                                }

                                // date.textContent = info.
            
                                // var crntIcon = document.getElementById('crntIcon');
                                // icon = currentWeather.weather[0].icon;
                                // crntIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            
                                // var crntTemp = document.getElementById('crntTemp');
                                // crntTemp.textContent = "Temperature: " + currentWeather.main.temp;
            
                                // var crntHumidity = document.getElementById('crntHumidity');
                                // crntHumidity.textContent = "Humidity: " + currentWeather.main.humidity;
            
                                // var crntWind = document.getElementById('crntWind');
                                // crntWind.textContent = "Wind Speeds: " + currentWeather.wind.speed

                            }












                        })
                })
    })

    count++                         // increment count by 1
}


// console.log(window.location.href.split('/'))

if (window.location.href.split('/')[window.location.href.split('/').length - 1] == 'index.html') {                   // Once deployed change index
    button.addEventListener('click', function() {
        getWeather(city)
    })
}



// history = JSON.parse(localStorage.getItem("search"))        // Get item from local storage and convert to object

// if (count === 0 || count === 3) {
//     if (count === 3) {
//         count = 0;
//     }

//     localStorage.setItem(search1, search);
// } 
// else if (count == 1) {
//     localStorage.setItem(search2, search);
// }
// else {
//     localStorage.setItem(search3, search);
// }
