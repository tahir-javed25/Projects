const fetchWeather = async () => {
    // DOM and defining the variables
  let searchInput = document.getElementById("search").value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "bolck";
  const apiKey = "e45dc11cd4b32af4c9422d8fef5504f8";


//   Checking if the searchInput is empty
  if (searchInput == "") {
    weatherDataSection = `
        <div>
  <h2>Empty Input!!</h2>
  <p>Please try again with a valid <u>City name</u></p>
    </div>`;
    return;
  }
// getting the Longitude and Latitude of the country added in the search field,
  const getLonAndLat =async ()=>{
    const countryCode = 92
    const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ","%20")},${countryCode}&limit=1&appid=${apiKey}`;

    const response = await fetch(geoCodeURL);
    // console.log(response);

    if(!response.ok){
        console.log("Bad Response", response.status);
        return;
    }

    const data = await response.json();
    // console.log(data);

    if(data.length == 0){
        weatherDataSection.innerHTML = `
        <div>
  <h2>Invalid Input: "${searchInput}"</h2>
  <p>Please try again with a valid <u>City name</u></p>
    </div>`
    }else {return data[0];}

  }
// now getting the longitude and latitude and passing it in a URL to get the exact weather details
  const getWeatherData = async (lon,lat)=>{
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response1 = await fetch(weatherURL);
    // console.log(response1);
    if (!response1.ok){
        console.log("Bad Response", response1.status);
        return;
    }
    const data1 =  await response1.json();
    // console.log(data1)
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML =`
    <img src="https://openweathermap.org/img/wn/${data1.weather[0].icon}.png" alt="${data1.weather[0].description}" width="100" />
<div>
  <h2>${data1.name}</h2>
  <p><strong>Temperature:</strong> ${Math.round(data1.main.temp - 273.15)}°C</p>
  <p><strong>Description:</strong> ${data1.weather[0].description}</p>
</div>
    `
  }

  document.getElementById("search").value = "";
// assigning the result of getLonAndLat function to a variable.
  const geoCodeData = await getLonAndLat();
//invoking the getWeatherData function by passing the longitude and latitude as arguments, and this longitude and latitude is got from the getLonAndLat function's URL
  getWeatherData(geoCodeData.lon,geoCodeData.lat)

};

const button = document.getElementById("submit");

button.addEventListener('click',fetchWeather)
