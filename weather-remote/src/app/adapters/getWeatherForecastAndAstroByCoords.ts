import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClientService } from '@/app/services/http/httpService';

//TODO: Improve callback and thunk types
interface CallbackParams {
  latitude: number;
  longitude: number;
  httpClient: HttpClientService;
}

const callback = async ({
  latitude,
  longitude,
  httpClient,
}: CallbackParams) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const responses = await httpClient.fetchDataConcurrent([
      {
        endpoint: '/forecast.json',
        params: {
          key: WEATHER_API_KEY,
          q: `${latitude},${longitude}`,
          days: '2',
        },
      },
      {
        endpoint: '/astronomy.json',
        params: {
          key: WEATHER_API_KEY,
          q: `${latitude},${longitude}`,
          dt: currentDate,
        },
      },
    ]);
    return responses;
  } catch (err) {
    return err;
  }
};

export const fetchWeatherForecastAstroByLocation = createAsyncThunk(
  'forecastAstroWeather/fetchWeatherForecastAstroByLocation',
  callback
);
