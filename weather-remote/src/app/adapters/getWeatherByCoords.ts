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
    const response = await httpClient.fetchData('/current.json', {
      key: WEATHER_API_KEY,
      q: `${latitude},${longitude}`,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const fetchWeatherByLocation = createAsyncThunk(
  'currentWeather/fetchWeatherByLocation',
  callback
);
