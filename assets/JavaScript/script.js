var weatherKey = 'ad8e412062cd1ab247bb3df3edb96e41';                    // API key
var latitude                                                            // API Url Parameters
var longitude

var recentSearch = JSON.parse(localStorage.getItem("search")) || []         // Object holding all recent searches for localstorage

var city
var country

var cityEl = document.getElementById("city"); 
var countryEl = document.getElementById("country")

var limit = 5
var dateCounter = 1     // used to keep track of dates for card

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

var searchList = document.getElementById('searchList');

var a1
var a2
var a3

var today = dayjs();

function getWeather(city) {
    city = cityEl.value;                    
    country = countryEl.value

    // console.log(city + ", " + country)

    if(usCodes.includes(country)){
        var geoCodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country},${unitedStates}&limit=${limit}&appid=${weatherKey}`;         // GeoCoding API - Provide latitude and longtitude when provided city, state and country code
    }

    else {
        var geoCodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${weatherKey}`;         
    }
    
    fetch(geoCodingAPI)
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            latitude = data[0].lat; 
            longitude = data[0].lon;
 
            // recentSearch[count] = city + ", " + country             // Sets count as the key and the city and state as the value for recentSearch object

            city = data[0].name;
            recentSearch.push(city + ", " + country)
            localStorage.setItem("search", JSON.stringify(recentSearch))        // Turn object to string to save in localstorage

            currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`

            fetch(currentWeatherAPI)
                .then(function(currentData) {             
                    // imageDiv.remove()                   // Removes HTML element
                    imageDiv.innerHTML = " ";
                    divEl.innerHTML = " ";              // Set elements innerHTML to blank to reset page
                    header.innerHTML = " ";

                    return currentData.json();
                })

                .then(function(currentWeather) {
                    // console.log(currentWeather);

                    divEl.classList = [];                   // Set the class for the element to a blank array meaning the element has no CSS classes
                    divEl.classList.add("row", "pt-3");

                    header.innerHTML = `                
                        <h1></h1>
                        <a href="./index.html">
                            <i class="fa-solid fa-house bs-info"> Try Again?</i>
                        </a>`

                    header.classList.add("pb-3")

                    var title = document.querySelector('h1');
                    title.textContent = currentWeather.name + ", " + country;

                    imageDiv.classList = [];
                    imageDiv.classList.add("d-flex", "justify-content-center", "pt-3")
                    imageDiv.innerHTML = `
                        <div class="card mb-3 currentDate">
                            <div class="row g-0">
                                <div class="col-md-4 d-flex align-items-center">
                                    <img class="img-fluid rounded-start" id="crntIcon" alt="weather icon"></img>                     <!--Hook for current weather icon-->
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h2 class="card-title" id="crntDate"></h2>                   <!--Hook for current date-->
                                        <p class="card-text" id="crntTemp">Temperature: </p>
                                        <p class="card-text" id="crntHumidity">Humidity: </p>
                                        <p class="card-text" id="crntWind">Wind Speeds: </p>
                                    </div>
                                </div>
                            </div>
                        </div>`

                    divEl.innerHTML =  `
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
                    crntDate.textContent =  today.format('dddd, MMMM DD, YYYY')

                    var crntIcon = document.getElementById('crntIcon');
                    icon = currentWeather.weather[0].icon;                                      // Returns icon code used in the url for the OpenWeather icons
                    crntIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`          // Sets the src for crntIcon element

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

                            for (var i = 1; i < 6; i++) {               // For loop to iterate through the 5 days of weather 
                                day = "day" + i;
                                icon = "d" + i + "Icon";
                                temp = "d" + i + "Temp";
                                humidity = "d" + i + "Humidity";
                                windSpeed = "d" + i + "Wind";

                                var date = document.getElementById(day);                // Uses the variables defined above to access the html elements for each corresponding date
                                var weatherIcon = document.getElementById(icon);
                                var temperature = document.getElementById(temp);
                                var humid = document.getElementById(humidity);
                                var wind = document.getElementById(windSpeed);

                                for(var a = 0; a < dateList.length; a++) {                  // For loop to iterate through the list of dates returned from OpenWeather API
                                    var time = dateList[a].dt_txt                          // Returns date and time
                                    
                                    // var timeRounded = Math.round((today.format('HH')) / 3) * 3      // Round up or down by 3 the current time in military format since OpenWeather API returns date and time in 3 hour intervals
                                    
                                    var days = dateList[a].dt_txt.slice(0, 10);         // Returns the date from OpenWeather API
                                   
                                    if ((dateList[a].dt_txt.slice(8, 10)) == (parseInt(today.format('DD')) + dateCounter)) {
                                        
                                        var index0 = dateList[0].dt_txt
                                        nineAM = index0[11] + index0[12]
                                        compareTime = (parseInt(nineAM) - 3)

                                        if ((time[11] + time[12]) == nineAM) {             
                                            date.textContent = dayjs(days).format('dddd, MMMM DD, YYYY')          // Formats the date returned from OpenWeather API using dayjs
                    
                                            icon = dateList[a].weather[0].icon;
                                            weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
                            
                                            temperature.textContent = "Temperature: " + dateList[a].main.temp;
                            
                                            humid.textContent = "Humidity: " + dateList[a].main.humidity;
                            
                                            wind.textContent = "Wind Speeds: " + dateList[a].wind.speed;
                                        } 

                                        if (dateCounter == 5) {
                                            if ((time[11] + time[12]) == ("0" + compareTime)) {             
                                                date.textContent = dayjs(days).format('dddd, MMMM DD, YYYY')          // Formats the date returned from OpenWeather API using dayjs
                        
                                                icon = dateList[a].weather[0].icon;
                                                weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
                                
                                                temperature.textContent = "Temperature: " + dateList[a].main.temp;
                                
                                                humid.textContent = "Humidity: " + dateList[a].main.humidity;
                                
                                                wind.textContent = "Wind Speeds: " + dateList[a].wind.speed;
                                            } 
                                        }
                                    }
                                }

                                dateCounter++
                            }
                        })
                })
    })


    if (recentSearch.length >= 1){
        var li1 = document.createElement('li');
        a1 = document.createElement('a');

        li1.classList.add("list-group-item", "list-group-item-info");
        a1.classList.add("list-group-item-action");
        a1.textContent = recentSearch[recentSearch.length - 1];

        li1.appendChild(a1);
        searchList.appendChild(li1);

        var splitIndex = a1.textContent.indexOf(",")
        city = a1.innerText.substring(0, splitIndex);
        country = a1.innerHTML.substring((splitIndex + 1), (a1.innerText.length))

        a1.addEventListener('click', function() {
            getWeather(city)
        })

        if (recentSearch.length >= 2){
            var li2 = document.createElement('li');
            a2 = document.createElement('a');

            li2.classList.add("list-group-item", "list-group-item-info");
            a2.classList.add("list-group-item-action");
            a2.textContent = recentSearch[recentSearch.length - 2];
    
            li2.appendChild(a2);
            searchList.appendChild(li2);

            if (recentSearch.length >= 3){        
                var li3 = document.createElement('li');
                a3 = document.createElement('a');

                li3.classList.add("list-group-item", "list-group-item-info");
                a3.classList.add("list-group-item-action");
                a3.textContent = recentSearch[recentSearch.length - 3];
        
                li3.appendChild(a3);
                searchList.appendChild(li3);
            }
        }
    } 
    else {
        var h3EL = document.getElementById('footerTxt');
        h3EL.style.display = 'none';
    }
}


button.addEventListener('click', function() {
    getWeather(city)
})



// a2.addEventListener('click', function() {
//     getWeather(city)
// })
// button.addEventListener('click', function() {
//     getWeather(city)
// })

// if (window.location.href.split('/')[window.location.href.split('/').length - 1] == 'index.html') {              
//     button.addEventListener('click', function() {
//         getWeather(city)
//     })
// }



// {/* <div class="card currentDate" style="width: 18rem;">
// <div class="card-body text-center">
//     <h2 id="crntDate"></h2>                   <!--Hook for current date-->
//     <img id="crntIcon" alt="weather icon"></img>                     <!--Hook for current weather icon-->
//     <p class="card-text" id="crntTemp">Temperature: </p>
//     <p class="card-text" id="crntHumidity">Humidity: </p>
//     <p class="card-text" id="crntWind">Wind Speeds: </p>
// </div>
// </div> */}
