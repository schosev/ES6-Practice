import * as ELEMENTS from './elements.js';
import {Weather} from './weather.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data.js';

const APP_ID = 'fcb270f477566d619fbad4366058a84a';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (CITY_NAME.length == 0) {
    return alert('Please enter a city name');
  }
  
  const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID

  Weather.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
      //create new proxy and pass in line above and weather proxy handler.
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temp = responseData.main.temp;
      updateWeather(WEATHER_PROXY);
    })
    .catch(error => alert(error));
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temp;

  //will display the box element
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}