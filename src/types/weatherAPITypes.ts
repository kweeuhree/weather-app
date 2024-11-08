export type CoordinatesResponse = {
  weatherData: WeatherDataType | null;
  forecastData: ForecastDataType | null;
};

type WeatherCondition = {
    text: string;
    icon: string;
    code: number;
  };
  
  type CurrentWeather = {
    cloud: number;
    condition: WeatherCondition;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
  };
  
  type LocationWeather = {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  };
  
  type Astro = {
    sunrise: string;
    sunset: string;
  };

  export type DayForecast = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
  };

  export type HourData = {
    chance_of_rain: number;
    chance_of_snow: number;
    cloud: number;
    condition: WeatherCondition;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    snow_cm: number;
    temp_c: number;
    temp_f: number;
    time: string;
    time_epoch: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    will_it_rain: number;
    will_it_snow: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
  };

  type ForecastDay = {
    date: string;
    date_epoch: number;
    day: DayForecast;
    astro: Astro;
    hour: HourData[];
  };

  type Forecast = {
    forecastday: ForecastDay[];
  };

  // exported data types
  export type WeatherDataType = {
    location: LocationWeather;
    current: CurrentWeather;
  };

  export type ForecastDataType = {
    location: LocationWeather;
    current: CurrentWeather;
    forecast: Forecast;
  };

  export type City = {
    current: WeatherDataType;
    forecast: ForecastDataType;
  }