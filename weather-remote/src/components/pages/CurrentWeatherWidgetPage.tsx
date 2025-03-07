import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getLocation } from '@/app/services/location/geolocation';
import { AxiosHttpService } from '@/app/services/http/axiosHttpService';
import { HttpClientService } from '@/app/services/http/httpService';
import { getDayByStringDate } from '@/app/services/date/getDayByStringDate';
import { getDateByStringDate } from '@/app/services/date/getDateByStringDate';
import { fetchWeatherByLocation } from '@/app/adapters/getWeatherByCoords';
import { Card } from '@/components/organisms/Card';
import { Toggle } from '@/components/organisms/Toggle';
import { Badge } from '@/components/molecules/Badge';
import { MapMarkerSvg } from '@/components/atoms/icons/MapMarkerSvg';
import {
  emitTemperatureTypeChange,
  TEMPERATURES,
} from '@/app/services/events/changeTemperature';

const CurrentWeatherWidgetPage = () => {
  const dispatch = useAppDispatch();
  const { loading, weather } = useAppSelector((state) => state.currentWeather);
  const [useFarenheit, setUseFarenheit] = useState(false);

  useEffect(() => {
    getLocation()
      .then((position) => {
        const axiosService = new AxiosHttpService(WEATHER_API_URL);
        const httpClient = new HttpClientService(axiosService);

        dispatch(
          fetchWeatherByLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            httpClient,
          })
        );
      })
      .catch((error) => {
        console.error('Error getting location: ', error);
      });
  }, []);

  const onChangeTemperatureType = () => {
    const temperatureNextMutation = !useFarenheit;

    emitTemperatureTypeChange(
      temperatureNextMutation ? TEMPERATURES.FARENHEIT : TEMPERATURES.CELSIUS
    );
    setUseFarenheit(temperatureNextMutation);
  };

  return (
    <Card
      data-testid='current-weather-widget'
      render={() => (
        <>
          <div className='is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap'>
            <Badge
              isLoading={loading}
              icon={<MapMarkerSvg />}
              text={`${weather?.location?.name}, ${weather?.location?.country}`}
            />
            <Toggle
              data-testid='temperature-toggle'
              isLoading={loading}
              primaryTitle='°F'
              secondaryTitle='°C'
              isSelected={useFarenheit}
              onToggle={onChangeTemperatureType}
            />
          </div>
          <div className='is-flex is-justify-content-space-between'>
            <div>
              <div className='mb-5'>
                <p className={`is-size-3 ${loading ? 'is-skeleton' : ''}`}>
                  {getDayByStringDate(weather?.location?.localtime || '')}
                </p>
                <p
                  className={`is-size-6 mt-1 mb-1 ${loading ? 'is-skeleton' : ''}`}
                >
                  {getDateByStringDate(weather?.location?.localtime || '')}
                </p>
              </div>
              <div>
                <p className={`is-size-1 mb-1 ${loading ? 'is-skeleton' : ''}`}>
                  {useFarenheit
                    ? `${weather?.current?.temp_f}°F`
                    : `${weather?.current?.temp_c}°C`}
                </p>
                <p className={`is-size-6 ${loading ? 'is-skeleton' : ''}`}>
                  Wind Speed: {weather?.current?.wind_kph} kph
                </p>
              </div>
            </div>

            <div>
              <figure
                className={`image is-128x128 mb-1 ${loading ? 'is-skeleton' : ''}`}
              >
                <img
                  alt='Weather Image'
                  src={weather?.current?.condition?.icon.replace(
                    '64x64',
                    '128x128'
                  )}
                />
              </figure>

              <p
                className={`is-size-3 mb-1 has-text-right ${loading ? 'is-skeleton' : ''}`}
              >
                {weather?.current?.condition?.text}
              </p>
              <p
                className={`is-size-6 has-text-right ${loading ? 'is-skeleton' : ''}`}
              >
                Feels like
                {useFarenheit
                  ? ` ${weather?.current?.feelslike_f}°F`
                  : ` ${weather?.current?.feelslike_c}°C`}
              </p>
            </div>
          </div>
        </>
      )}
    />
  );
};

export { CurrentWeatherWidgetPage };
