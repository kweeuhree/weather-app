import { getCoordinates } from "./geolocation";
import { WeatherDataType, ForecastDataType, CoordinatesResponse } from "../types";

const api_key = import.meta.env.VITE_WEATHER_API;
export const api_query = `?key=${api_key}`;
export const baseUrl = `https://api.weatherapi.com/v1/current.json`;
export const forecastUrl = `https://api.weatherapi.com/v1//forecast.json`;

// fetch weather function
export const fetchWeather = async (url: string, ...args: string[]) => {

  let fetchAllUrl = '';
  const [arg1, arg2] = args;

  if ( args.length === 2 ) {
    fetchAllUrl = `${url}${api_query}&q=${arg1},${arg2}`; // default location url
  } else if ( args.length === 1 ) {
    fetchAllUrl = `${url}${api_query}&q=${arg1}`; // user search url
  } else {
    console.log('Failed inside fetchWeather');
    return;
  }
  
  try {
    const response = await fetch(fetchAllUrl);
    const data = await response.json();

    if(!data.error) return data;
    
    return null;
    
  } catch (error) {
    console.log('Error inside fetchWeather ', error);
  }
};


export const fetchWeatherData = async (location: {
  [key: string]: string,
}) => {
  let weatherData: WeatherDataType | null = null;
  let forecastData: ForecastDataType | null = null;
    if (location.lat && location.lon) {
      weatherData = await fetchWeather(baseUrl, location.lat, location.lon);
      forecastData = await fetchWeather(forecastUrl, location.lat, location.lon);
    } else if (location.city) {
      weatherData = await fetchWeather(baseUrl, location.city);
      forecastData = await fetchWeather(forecastUrl, location.city);
    }

    return { weatherData, forecastData };
};


export const fetchCoordinates = async (): Promise<CoordinatesResponse> => {
    const response = await getCoordinates();
    const { latitude, longitude } = response;

    return fetchWeatherData({ lat: latitude, lon: longitude });

};


