// console.log("axios", axios);

let countries = null;
const selectCountryElm = document.getElementById("select-countries");
const selectCityElm = document.getElementById("select-cities");

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
  const cityData = await axios.get(
    `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${selectedCity}&hateoasMode=false&limit=5&offset=0`
  );
  console.log("cityData:", cityData.data.data[0]);
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
