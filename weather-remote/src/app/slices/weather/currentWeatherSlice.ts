import { createSlice } from '@reduxjs/toolkit';
import { Weather } from '@/models/Weather';
import { fetchWeatherByLocation } from '@/app/adapters/getWeatherByCoords';

interface InitialState {
  loading: boolean;
  status: 'success' | 'error' | 'none';
  weather?: Weather;
}

const initialState: InitialState = {
  loading: true,
  status: 'none',
};

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'success';

        //TODO: Change this assertion to action.payload correct type
        state.weather = action.payload as Weather;
      })
      .addCase(fetchWeatherByLocation.rejected, (state) => {
        state.loading = false;
        state.status = 'error';
      });
  },
});

export default currentWeatherSlice.reducer;
