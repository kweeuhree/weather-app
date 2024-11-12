import { describe, test, expect, vi, afterAll } from "vitest";
import { getData, fetchWeatherData, getFetchUrl } from "../src/utils";

import type { env } from "../src/types/vite-env";

// Mocking getCoordinates function to simulate different responses
vi.mock("./geolocation", () => ({
  getCoordinates: vi.fn(),
}));

// Mocking fetch to simulate the API responses
vi.stubGlobal("fetch", vi.fn());

const api_key = import.meta.env.VITE_WEATHER_API;

describe("Weather API Functions", () => {
  describe("getFetchUrl", () => {
    test("should build correct URL with city name", async () => {
      const url = "https://api.weatherapi.com/v1/current.json";
      const city = "London";

      const result = await getFetchUrl(url, city);

      expect(result).toBe(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=London`
      );
    });

    test("should build correct URL with latitude and longitude", async () => {
      const url = "https://api.weatherapi.com/v1/current.json";
      const lat = "51.5074";
      const lon = "-0.1278";

      const result = await getFetchUrl(url, lat, lon);

      expect(result).toBe(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=51.5074,-0.1278`
      );
    });

    test("should return undefined if no arguments are passed", async () => {
      const url = "https://api.weatherapi.com/v1/current.json";
      const result = await getFetchUrl(url);

      expect(result).toBeUndefined();
    });
  });

  describe("fetchWeatherData", () => {
    test("should return weather data on successful API response", async () => {
      // Mocking a successful fetch response
      const mockResponse = { current: { temperature: 20 }, error: null };
      fetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = "https://api.weatherapi.com/v1/current.json";
      const data = await fetchWeatherData(url);

      expect(data).toEqual(mockResponse);
    });

    test("should return null if API returns an error", async () => {
      // Mocking a failed API response
      const mockResponse = { error: { message: "Not Found" } };
      fetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = "https://api.weatherapi.com/v1/current.json";
      const data = await fetchWeatherData(url);

      expect(data).toBeNull();
    });

    test("should catch errors during the fetch request", async () => {
      // Simulate fetch failure
      fetch.mockRejectedValueOnce(new Error("Network Error"));

      const url = "https://api.weatherapi.com/v1/current.json";
      const data = await fetchWeatherData(url);

      expect(data).toBeUndefined();
    });
  });

  describe("getData", () => {
    test("should return current and forecast data for valid city", async () => {
      // Mocking successful fetch responses
      const mockWeatherResponse = { current: { temp: 25 }, error: null };
      fetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockWeatherResponse),
      });

      const mockForecastResponse = {
        forecast: { forecastday: [] },
        error: null,
      };
      fetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockForecastResponse),
      });

      const location = { city: "London" };
      const data = await getData(location);

      expect(data.currentData).toEqual(mockWeatherResponse);
      expect(data.forecastData).toEqual(mockForecastResponse);
    });

    test("should return default data when fetchWeatherData returns null", async () => {
      // Mocking fetch to return null for currentData and forecastData
      fetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce({ error: { message: "Error" } }),
      });

      const location = { city: "UnknownCity" };
      const data = await getData(location);

      expect(data.currentData).toBe(null);
      expect(data.forecastData).toBe(undefined);
    });
  });
});
