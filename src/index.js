import "./style.css";
import * as WeatherAPIHandler from "./weatherAPIhandler";

const currentWeatherData = {};
const form = document.querySelector("form");
const searchBar = document.getElementById("search-city");
const arrowDropdown = document.querySelector(".arrow-dropdown");
const dropdownContainer = document.querySelector(".toggle-container");
const degreeCheckbox = document.getElementById("degree-checkbox");
const degreeSwitch = document.querySelector(".switch");
const exitToggleBtn = document.querySelector(".exit");

let isCelsius = false;

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

const convertToCelcius = (num) => {
  let newNum = num.split("°")[0];
  newNum = (newNum - 32) * (5 / 9);
  newNum = Math.round(newNum);
  newNum = newNum.toString().concat("°");

  return newNum;
};

const convertToFarenheit = (num) => {
  let newNum = num.split("°")[0];

  newNum = newNum * (9 / 5) + 32;

  newNum = Math.round(newNum);
  newNum = newNum.toString().concat("°");

  return newNum;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  findCityWeather(searchBar.value);
  form.reset();
});

degreeCheckbox.addEventListener("click", () => {
  if (!isCelsius) {
    isCelsius = true;
    currentWeatherData.main.temp = convertToCelcius(
      currentWeatherData.main.temp
    );
    currentWeatherData.main.feels_like = convertToCelcius(
      currentWeatherData.main.feels_like
    );
    currentWeatherData.main.temp_max = convertToCelcius(
      currentWeatherData.main.temp_max
    );
    currentWeatherData.main.temp_min = convertToCelcius(
      currentWeatherData.main.temp_min
    );
    displayData();
    console.log(currentWeatherData);
  } else if (isCelsius) {
    isCelsius = false;
    currentWeatherData.main.temp = convertToFarenheit(
      currentWeatherData.main.temp
    );
    currentWeatherData.main.feels_like = convertToFarenheit(
      currentWeatherData.main.feels_like
    );
    currentWeatherData.main.temp_max = convertToFarenheit(
      currentWeatherData.main.temp_max
    );
    currentWeatherData.main.temp_min = convertToFarenheit(
      currentWeatherData.main.temp_min
    );
    displayData();
  }
});

arrowDropdown.addEventListener("mouseover", () => {
  dropdownContainer.classList.add("active-flex");
});

exitToggleBtn.addEventListener("click", () => {
  dropdownContainer.classList.add("anim-out");
  dropdownContainer.style.zIndex = "-1";
  dropdownContainer.classList.remove("active-flex");
});

dropdownContainer.addEventListener("animationend", () => {
  if (dropdownContainer.classList.contains("anim-out")) {
    dropdownContainer.classList.remove("anim-out");
  }

  if (dropdownContainer.classList.contains("active-flex")) {
    dropdownContainer.style.zIndex = "0";
  }
});

findCityWeather("London");
