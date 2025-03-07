import { createSlice } from '@reduxjs/toolkit';
import { AstroLocation } from '@/models/Astro';
import { Forecast } from '@/models/Forecast';
import { fetchWeatherForecastAstroByLocation } from '@/app/adapters/getWeatherForecastAndAstroByCoords';

interface InitialState {
  loading: boolean;
  status: 'success' | 'error' | 'none';
  weather?: Forecast;
  astro?: AstroLocation;
}

const initialState: InitialState = {
  loading: true,
  status: 'none',
};

export const forecastWeatherAstroSlice = createSlice({
  name: 'forecastAstroWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecastAstroByLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchWeatherForecastAstroByLocation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.status = 'success';

          //TODO: Change this assertion to action.payload correct type
          const responses = action.payload as (AstroLocation | Forecast)[];
          state.weather = responses[0] as Forecast;
          state.astro = responses[1] as AstroLocation;
        }
      )
      .addCase(fetchWeatherForecastAstroByLocation.rejected, (state) => {
        state.loading = false;
        state.status = 'error';
      });
  },
});

export default forecastWeatherAstroSlice.reducer;
