import { pick } from "lodash";

const key = "2f685353f752e350aeaea48d4539ebec";

const processObject = (unFilteredData) => {
  const filteredData = pick(unFilteredData, [
    "main",
    "weather",
    "name",
    "wind",
  ]);
  return filteredData;
};

export const getCityData = async (city) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=imperial`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    return processObject(weatherData);
  } catch (error) {
    return error;
  }
};
