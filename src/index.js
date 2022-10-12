import "./style.css";
import * as WeatherAPIHandler from "./weatherAPIhandler";

const currentWeatherData = {};
const form = document.querySelector("form");
const searchBar = document.getElementById("search-city");

const displayData = () => {
  const temp = document.querySelector(".temp");
  temp.textContent = currentWeatherData.main.temp;

  const location = document.querySelector(".location");
  location.textContent = `${currentWeatherData.name}, ${currentWeatherData.country}`;

  const hiTemp = document.querySelector(".hi span:last-child");
  hiTemp.textContent = currentWeatherData.main.temp_max;

  const loTemp = document.querySelector(".lo span:last-child");
  loTemp.textContent = currentWeatherData.main.temp_min;

  const weatherName = document.querySelector(".weather-name");
  weatherName.textContent = currentWeatherData.weather[0].main;

  const weatherDetails = document.querySelector(".weather-details");
  weatherDetails.textContent = currentWeatherData.weather[0].description;

  const feelsLikeTemp = document.querySelector(".feels-like p:last-child");
  feelsLikeTemp.textContent = currentWeatherData.main.feels_like;

  const humidity = document.querySelector(".humidity p:last-child");
  humidity.textContent = currentWeatherData.main.humidity;

  const pressure = document.querySelector(".pressure p:last-child");
  pressure.textContent = currentWeatherData.main.pressure;

  const wind = document.querySelector(".wind p:last-child");
  wind.textContent = currentWeatherData.wind;
};

const findCityWeather = (city) => {
  WeatherAPIHandler.getCityData(city).then((data) => {
    Object.assign(currentWeatherData, data);
    displayData();
    console.log(currentWeatherData);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  findCityWeather(searchBar.value);
  form.reset();
});

findCityWeather("London");
