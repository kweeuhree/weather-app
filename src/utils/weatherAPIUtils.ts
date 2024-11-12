import { getCoordinates } from "./geolocation";
import { CoordinatesResponse } from "../types";

/**
 * API setup
 *
 * The API key is retrieved from environment variables, and the base URLs for current weather
 * and forecast data endpoints are defined here for API requests.
 * For more information refer to https://www.weatherapi.com/docs/
 */
const api_key = import.meta.env.VITE_WEATHER_API;
export const api_query = `?key=${api_key}`;
export const baseUrl = `https://api.weatherapi.com/v1/current.json`;
export const forecastUrl = `https://api.weatherapi.com/v1//forecast.json`;

/**
 * Fetches weather data from the specified URL and parses the response.
 */
export const fetchWeatherData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.error) return data;

    return null;
  } catch (error) {
    console.log(
      `Error fetching weather data: ${error.message ? error.message : error}`
    );
  }
};

/**
 * Constructs a URL for fetching weather data based on the provided location.
 *
 * - If two arguments are provided, it assumes the location is specified by latitude and longitude.
 * - If one argument is provided, it assumes the location is specified by the city name.
 */
export const getFetchUrl = async (url: string, ...args: string[]) => {
  let fetchAllUrl = "";
  const [arg1, arg2] = args;

  if (args.length === 2) {
    fetchAllUrl = `${url}${api_query}&q=${arg1},${arg2}`; // default location url
  } else if (args.length === 1) {
    fetchAllUrl = `${url}${api_query}&q=${arg1}`; // user search url
  } else {
    console.log("Failed inside getFetchUrl");
    return;
  }

  return fetchAllUrl;
};

/**
 * Fetches weather and forecast data based on the provided location.
 * - If latitude and longitude are provided, they are used to fetch the data.
 * - If only a city name is provided, it will be used instead.
 * Returns an object containing the weather and forecast data.
 */
export const getData = async (location: { [key: string]: string }) => {
  const { lat, lon, city } = location;
  const args = lat && lon ? [lat, lon] : [city];

  const currentData = await getFetchUrl(baseUrl, ...args).then(
    fetchWeatherData
  );
  const forecastData = await getFetchUrl(forecastUrl, ...args).then(
    fetchWeatherData
  );

  return { currentData, forecastData };
};

/**
 * Fetches the user's coordinates (latitude and longitude)
 * and retrieves current weather and forecast data based on those coordinates.
 */
export const fetchCoordinates = async (): Promise<CoordinatesResponse> => {
  try {
    const response = await getCoordinates();
    const { lat, lon } = response;

    return getData({ lat, lon });
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    // Display New York if the user does not share their location
    return getData({ city: "New York" });
  }
};
