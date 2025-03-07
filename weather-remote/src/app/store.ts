import { configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from './slices/weather/currentWeatherSlice';
import forecastWeatherAstroReducer from './slices/weather/forecastWeatherAstroSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    forecastWeatherAstro: forecastWeatherAstroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
