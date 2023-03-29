function fToC(fahrenheit) {
  const fTemp = fahrenheit;
  const fToCel = ((fTemp - 32) * 5) / 9;
  return fToCel;
}
function kToC(kelvin) {
  const kToCel = kelvin - 273.15;
  return kToCel.toFixed(2);
}

const weather = {
  dt: 1680123600,
  main: {
    temp: 273.88,
    feels_like: 273.88,
    temp_min: 273.76,
    temp_max: 273.88,
    pressure: 1023,
    sea_level: 1023,
    grnd_level: 970,
    humidity: 92,
    temp_kf: 0.12,
  },
  weather: [
    {
      id: 600,
      main: "Snow",
      description: "hafif kar yağışlı",
      icon: "13n",
    },
  ],
  clouds: {
    all: 100,
  },
  wind: {
    speed: 1.13,
    deg: 291,
    gust: 1.96,
  },
  visibility: 4837,
  pop: 0.59,
  snow: {
    "3h": 0.7,
  },
  sys: {
    pod: "n",
  },
  dt_txt: "2023-03-29 21:00:00",
};
