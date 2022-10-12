import { pick } from "lodash";

const key = "2f685353f752e350aeaea48d4539ebec";
// Process the data obj for only relevent data
const processObject = (unFilteredData) => {
  // Picks only the properties we need
  const filteredData = pick(unFilteredData, [
    "main",
    "weather",
    "name",
    "wind",
    "sys",
  ]);
  // Apply any final touches to its data before we send it back
  // Rounds the temps and adds a symbol
  filteredData.main.temp = Math.round(filteredData.main.temp)
    .toString()
    .concat("°");

  filteredData.main.feels_like = Math.round(filteredData.main.feels_like)
    .toString()
    .concat("°");

  filteredData.main.temp_max = Math.round(filteredData.main.temp_max)
    .toString()
    .concat("°");

  filteredData.main.temp_min = Math.round(filteredData.main.temp_min)
    .toString()
    .concat("°");
  // Make humudity into percent
  filteredData.main.humidity = filteredData.main.humidity
    .toString()
    .concat("%");
  // Add unit to pressure
  filteredData.main.pressure = filteredData.main.pressure
    .toString()
    .concat("mb");
  // Calculate wind speed and direction
  const deg = filteredData.wind.deg;
  let windDirection;
  switch (true) {
    case (deg >= 338 || deg <= 0) && deg < 22:
      windDirection = "N";
      break;
    case deg >= 22 && deg < 68:
      windDirection = "NE";
      break;
    case deg >= 68 && deg < 112:
      windDirection = "E";
      break;
    case deg >= 112 && deg < 158:
      windDirection = "SE";
      break;
    case deg >= 158 && deg < 202:
      windDirection = "S";
      break;
    case deg >= 202 && deg < 248:
      windDirection = "SW";
      break;
    case deg >= 248 && deg < 292:
      windDirection = "W";
      break;
    case deg >= 292 && deg < 338:
      windDirection = "NW";
      break;
    default:
      windDirection = "Error";
  }

  filteredData.wind = `${windDirection} ${Math.round(
    filteredData.wind.speed
  )} mph`;
  // Extract the country name out to its own property
  filteredData.country = filteredData.sys.country;
  delete filteredData.sys;

  return filteredData;
};

// Hits API for weather data on given city
export const getCityData = async (city) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=imperial`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return processObject(weatherData);
  } catch (error) {
    return error;
  }
};
