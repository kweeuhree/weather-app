import type { City } from "../src/types";

// This file contains mock data for New York City, Los Angeles and London

export const newYorkCity: City = {
  current: {
    location: {
      country: "United States",
      lat: 40.7128,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -74.006,
      name: "New York",
      region: "New York",
      tz_id: "America/New_York",
    },
    current: {
      cloud: 20,
      condition: {
        text: "Partly cloudy",
        icon: "https://example.com/cloudy_icon.png",
        code: 1003,
      },
      dewpoint_c: 10,
      dewpoint_f: 50,
      feelslike_c: 15,
      feelslike_f: 59,
      gust_kph: 25,
      gust_mph: 15.5,
      heatindex_c: 18,
      heatindex_f: 64.4,
      humidity: 60,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0.01,
      precip_mm: 0.25,
      pressure_in: 1013,
      pressure_mb: 1013,
      temp_c: 14,
      temp_f: 57.2,
      uv: 3,
      vis_km: 10,
      vis_miles: 6.2,
      wind_degree: 90,
      wind_dir: "E",
      wind_kph: 15,
      wind_mph: 9.3,
      windchill_c: 12,
      windchill_f: 53.6,
    },
  },
  forecast: {
    location: {
      country: "United States",
      lat: 40.7128,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -74.006,
      name: "New York",
      region: "New York",
      tz_id: "America/New_York",
    },
    current: {
      cloud: 20,
      condition: {
        text: "Partly cloudy",
        icon: "https://example.com/cloudy_icon.png",
        code: 1003,
      },
      dewpoint_c: 10,
      dewpoint_f: 50,
      feelslike_c: 15,
      feelslike_f: 59,
      gust_kph: 25,
      gust_mph: 15.5,
      heatindex_c: 18,
      heatindex_f: 64.4,
      humidity: 60,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0.01,
      precip_mm: 0.25,
      pressure_in: 1013,
      pressure_mb: 1013,
      temp_c: 14,
      temp_f: 57.2,
      uv: 3,
      vis_km: 10,
      vis_miles: 6.2,
      wind_degree: 90,
      wind_dir: "E",
      wind_kph: 15,
      wind_mph: 9.3,
      windchill_c: 12,
      windchill_f: 53.6,
    },
    forecast: {
      forecastday: [
        {
          date: "2024-11-13",
          date_epoch: 1699864800,
          day: {
            maxtemp_c: 16,
            maxtemp_f: 60.8,
            mintemp_c: 8,
            mintemp_f: 46.4,
            avgtemp_c: 12,
            avgtemp_f: 53.6,
            maxwind_kph: 30,
            maxwind_mph: 18.6,
            totalprecip_mm: 1.2,
            totalprecip_in: 0.05,
            avgvis_km: 8,
            avgvis_miles: 5,
            avghumidity: 65,
            daily_will_it_rain: 1,
            daily_chance_of_rain: 60,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: "Rain",
              icon: "https://example.com/rain_icon.png",
              code: 1063,
            },
          },
          astro: {
            sunrise: "06:45",
            sunset: "17:45",
          },
          hour: [
            {
              chance_of_rain: 1,
              chance_of_snow: 0,
              time: "2024-11-13 01:00",
              time_epoch: 1699867200,
              temp_c: 18,
              temp_f: 64.4,
              humidity: 35,
              dewpoint_c: 7,
              dewpoint_f: 44.6,
              feelslike_c: 16,
              feelslike_f: 60.8,
              gust_kph: 15,
              gust_mph: 9.3,
              heatindex_c: 19,
              heatindex_f: 66.2,
              pressure_in: 1012,
              pressure_mb: 1012,
              precip_in: 0,
              precip_mm: 0,
              snow_cm: 0,
              cloud: 0,
              condition: {
                text: "Clear",
                icon: "https://example.com/clear_icon.png",
                code: 1000,
              },
              is_day: 1,
              uv: 1,
              vis_km: 15,
              vis_miles: 9.3,
              will_it_rain: 0,
              will_it_snow: 0,
              wind_degree: 180,
              wind_dir: "S",
              wind_kph: 10,
              wind_mph: 6.2,
              windchill_c: 17,
              windchill_f: 62.6,
            },
          ],
        },
      ],
    },
  },
};

export const losAngeles: City = {
  current: {
    location: {
      country: "United States",
      lat: 34.0522,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -118.2437,
      name: "Los Angeles",
      region: "California",
      tz_id: "America/Los_Angeles",
    },
    current: {
      cloud: 5,
      condition: {
        text: "Clear",
        icon: "https://example.com/clear_icon.png",
        code: 1000,
      },
      dewpoint_c: 12,
      dewpoint_f: 53.6,
      feelslike_c: 20,
      feelslike_f: 68,
      gust_kph: 15,
      gust_mph: 9.3,
      heatindex_c: 22,
      heatindex_f: 71.6,
      humidity: 30,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0,
      precip_mm: 0,
      pressure_in: 1015,
      pressure_mb: 1015,
      temp_c: 22,
      temp_f: 71.6,
      uv: 7,
      vis_km: 15,
      vis_miles: 9.3,
      wind_degree: 180,
      wind_dir: "S",
      wind_kph: 20,
      wind_mph: 12.4,
      windchill_c: 20,
      windchill_f: 68,
    },
  },
  forecast: {
    location: {
      country: "United States",
      lat: 34.0522,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -118.2437,
      name: "Los Angeles",
      region: "California",
      tz_id: "America/Los_Angeles",
    },
    current: {
      cloud: 5,
      condition: {
        text: "Clear",
        icon: "https://example.com/clear_icon.png",
        code: 1000,
      },
      dewpoint_c: 12,
      dewpoint_f: 53.6,
      feelslike_c: 20,
      feelslike_f: 68,
      gust_kph: 15,
      gust_mph: 9.3,
      heatindex_c: 22,
      heatindex_f: 71.6,
      humidity: 30,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0,
      precip_mm: 0,
      pressure_in: 1015,
      pressure_mb: 1015,
      temp_c: 22,
      temp_f: 71.6,
      uv: 7,
      vis_km: 15,
      vis_miles: 9.3,
      wind_degree: 180,
      wind_dir: "S",
      wind_kph: 20,
      wind_mph: 12.4,
      windchill_c: 20,
      windchill_f: 68,
    },
    forecast: {
      forecastday: [
        {
          date: "2024-11-13",
          date_epoch: 1699864800,
          day: {
            maxtemp_c: 24,
            maxtemp_f: 75.2,
            mintemp_c: 16,
            mintemp_f: 60.8,
            avgtemp_c: 20,
            avgtemp_f: 68,
            maxwind_kph: 25,
            maxwind_mph: 15.5,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            avgvis_km: 15,
            avgvis_miles: 9.3,
            avghumidity: 30,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: "Clear",
              icon: "https://example.com/clear_icon.png",
              code: 1000,
            },
          },
          astro: {
            sunrise: "06:00",
            sunset: "17:30",
          },
          hour: [
            {
              chance_of_rain: 0,
              chance_of_snow: 0,
              time: "2024-11-13 01:00",
              time_epoch: 1699867200,
              temp_c: 20,
              temp_f: 68,
              humidity: 40,
              dewpoint_c: 10,
              dewpoint_f: 50,
              feelslike_c: 19,
              feelslike_f: 66.2,
              gust_kph: 18,
              gust_mph: 11.2,
              heatindex_c: 22,
              heatindex_f: 71.6,
              pressure_in: 1015,
              pressure_mb: 1015,
              precip_in: 0,
              precip_mm: 0,
              snow_cm: 0,
              cloud: 0,
              condition: {
                text: "Clear",
                icon: "https://example.com/clear_icon.png",
                code: 1000,
              },
              is_day: 1,
              uv: 2,
              vis_km: 20,
              vis_miles: 12.4,
              will_it_rain: 0,
              will_it_snow: 0,
              wind_degree: 210,
              wind_dir: "SW",
              wind_kph: 13,
              wind_mph: 8.1,
              windchill_c: 19,
              windchill_f: 66.2,
            },
          ],
        },
      ],
    },
  },
};

export const london: City = {
  current: {
    location: {
      country: "United Kingdom",
      lat: 51.5074,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -0.1278,
      name: "London",
      region: "England",
      tz_id: "Europe/London",
    },
    current: {
      cloud: 80,
      condition: {
        text: "Overcast",
        icon: "https://example.com/overcast_icon.png",
        code: 1006,
      },
      dewpoint_c: 9,
      dewpoint_f: 48.2,
      feelslike_c: 12,
      feelslike_f: 53.6,
      gust_kph: 20,
      gust_mph: 12.4,
      heatindex_c: 14,
      heatindex_f: 57.2,
      humidity: 75,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0.15,
      precip_mm: 3.8,
      pressure_in: 1012,
      pressure_mb: 1012,
      temp_c: 10,
      temp_f: 50,
      uv: 2,
      vis_km: 10,
      vis_miles: 6.2,
      wind_degree: 200,
      wind_dir: "SSW",
      wind_kph: 25,
      wind_mph: 15.5,
      windchill_c: 8,
      windchill_f: 46.4,
    },
  },
  forecast: {
    location: {
      country: "United Kingdom",
      lat: 51.5074,
      localtime: "2024-11-12 10:00",
      localtime_epoch: 1699778400,
      lon: -0.1278,
      name: "London",
      region: "England",
      tz_id: "Europe/London",
    },
    current: {
      cloud: 80,
      condition: {
        text: "Overcast",
        icon: "https://example.com/overcast_icon.png",
        code: 1006,
      },
      dewpoint_c: 9,
      dewpoint_f: 48.2,
      feelslike_c: 12,
      feelslike_f: 53.6,
      gust_kph: 20,
      gust_mph: 12.4,
      heatindex_c: 14,
      heatindex_f: 57.2,
      humidity: 75,
      is_day: 1,
      last_updated: "2024-11-12 10:00",
      last_updated_epoch: 1699778400,
      precip_in: 0.15,
      precip_mm: 3.8,
      pressure_in: 1012,
      pressure_mb: 1012,
      temp_c: 10,
      temp_f: 50,
      uv: 2,
      vis_km: 10,
      vis_miles: 6.2,
      wind_degree: 200,
      wind_dir: "SSW",
      wind_kph: 25,
      wind_mph: 15.5,
      windchill_c: 8,
      windchill_f: 46.4,
    },
    forecast: {
      forecastday: [
        {
          date: "2024-11-13",
          date_epoch: 1699864800,
          day: {
            maxtemp_c: 12,
            maxtemp_f: 53.6,
            mintemp_c: 6,
            mintemp_f: 42.8,
            avgtemp_c: 9,
            avgtemp_f: 48.2,
            maxwind_kph: 20,
            maxwind_mph: 12.4,
            totalprecip_mm: 5,
            totalprecip_in: 0.2,
            avgvis_km: 8,
            avgvis_miles: 5,
            avghumidity: 75,
            daily_will_it_rain: 1,
            daily_chance_of_rain: 80,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: "Rain",
              icon: "https://example.com/rain_icon.png",
              code: 1063,
            },
          },
          astro: {
            sunrise: "06:30",
            sunset: "16:30",
          },
          hour: [
            {
              chance_of_rain: 0,
              chance_of_snow: 0,
              time: "2024-11-13 01:00",
              time_epoch: 1699867200,
              temp_c: 10,
              temp_f: 50,
              humidity: 80,
              dewpoint_c: 9,
              dewpoint_f: 48.2,
              feelslike_c: 12,
              feelslike_f: 53.6,
              gust_kph: 20,
              gust_mph: 12.4,
              heatindex_c: 14,
              heatindex_f: 57.2,
              pressure_in: 1012,
              pressure_mb: 1012,
              precip_in: 0.15,
              precip_mm: 3.8,
              snow_cm: 0,
              cloud: 80,
              condition: {
                text: "Overcast",
                icon: "https://example.com/overcast_icon.png",
                code: 1006,
              },
              is_day: 1,
              uv: 2,
              vis_km: 10,
              vis_miles: 6.2,
              will_it_rain: 1,
              will_it_snow: 0,
              wind_degree: 200,
              wind_dir: "SSW",
              wind_kph: 25,
              wind_mph: 15.5,
              windchill_c: 8,
              windchill_f: 46.4,
            },
          ],
        },
      ],
    },
  },
};
