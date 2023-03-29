// console.log("axios", axios);
const APIKEY = "854312915ee06dc91df05e3b53609c26";
let countries = null;
const selectCountryElm = document.getElementById("select-countries");
const selectCityElm = document.getElementById("select-cities");
const weatherCardsElm = document.getElementById("weather-cards");
console.log("weatherCardsElm:", weatherCardsElm);

const onChangeCountry = (e) => {
  console.log("e", e.target.value);
  selectCityElm.innerHTML = "";

  const selectedCountry = e.target.value;
  const selectedCountyData = countries.filter(
    (country) => country.country === selectedCountry
  )[0];

  //   console.log("selectedCountyData:", selectedCountyData.cities);

  selectedCountyData.cities.forEach((city) => {
    let option = document.createElement("option");
    option.setAttribute("value", city);
    let optionText = document.createTextNode(city);
    option.appendChild(optionText);
    selectCityElm.appendChild(option);
  });
};
const onChangeCity = async (e) => {
  const selectedCity = e.target.value;
  console.log("selectedCity:", selectedCity);

  try {
    const cityData = await axios.get(
      `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${selectedCity}&hateoasMode=false&limit=5&offset=0`
    );
    console.log("cityData:", cityData.data.data[0]);
    const lat = cityData.data.data[0].latitude;
    const lon = cityData.data.data[0].longitude;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=tr`;

    const cityWeather = await axios.get(weatherUrl);
    console.log("cityWeather:", cityWeather.data.list);

    cityWeather.data.list.slice(0, 7).forEach((element) => {
      const weather = element;
      //   console.log("element:", element);
      const celcius = kToC(weather.main.temp);

      const description = weather.weather[0].description;
      const main = weather.weather[0].main;

      const { pressure } = weather.main;
      const { speed: windSpeed } = weather.wind;

      const cardDiv = `        
    <div class="card" id="weather-card">
          <div class="content">
            <div class="header">${weather.dt_txt}</div>
            <div class="meta">${celcius}</div>
            <div class="description">
              ${main}
            </div>
            <div class="description">
              ${description}
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Pressure: ${pressure}</div>
              <div class="ui basic red button">WindSpeed: ${windSpeed} </div>
            </div>
          </div>
        </div>`;
      weatherCardsElm.innerHTML += cardDiv;
    });
  } catch (error) {
    console.log("error:", error);
  }
};

selectCountryElm.addEventListener("change", onChangeCountry);
selectCityElm.addEventListener("change", onChangeCity);

const getCountries = async () => {
  try {
    const countriesRes = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    console.log("countriesRes:", countriesRes.data.data);
    countries = countriesRes.data.data;

    countries.forEach((country) => {
      //   console.log("country:", country);
      let option = document.createElement("option");
      option.setAttribute("value", country.country);
      if (country.country === "Turkey") {
        option.setAttribute("selected", true);
        country.cities.forEach((city) => {
          let option = document.createElement("option");
          option.setAttribute("value", city);
          let optionText = document.createTextNode(city);
          option.appendChild(optionText);
          selectCityElm.appendChild(option);
        });
      }
      let optionText = document.createTextNode(country.country);
      option.appendChild(optionText);
      selectCountryElm.appendChild(option);
    });
  } catch (error) {
    console.log("error:", error);
  }
};
getCountries();
