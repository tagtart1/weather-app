import "./style.css";
import * as WeatherAPIHandler from "./weatherAPIhandler";

const currentWeatherData = {};
const form = document.querySelector("form");
const searchBar = document.getElementById("search-city");

const findCityWeather = (city) => {
  WeatherAPIHandler.getCityData(city).then((data) => {
    Object.assign(currentWeatherData, data);
  });
  console.log(currentWeatherData);
};

console.log(currentWeatherData);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  findCityWeather(searchBar.value);
  form.reset();
});
