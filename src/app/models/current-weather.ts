export interface CurrentWeather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  hourly: Current[];
  daily: Current[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: number;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number | TimeOfDay;
  feels_like: number | TimeOfDay;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Weather[];
  pop?: number;
  min?: number;
  max?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
}

export interface TimeOfDay {
  day: number;
  min?: number;
  max?: number;
  night: number;
  eve: number;
  morn: number;
}
