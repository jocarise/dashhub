import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getLocation } from '@/app/services/location/geolocation';
import { AxiosHttpService } from '@/app/services/http/axiosHttpService';
import { HttpClientService } from '@/app/services/http/httpService';
import { getTimeByStringDate } from '@/app/services/date/getTimeByStringDate';
import { fetchWeatherForecastAstroByLocation } from '@/app/adapters/getWeatherForecastAndAstroByCoords';
import { Box } from '@/components/organisms/Box';
import { Figure } from '@/components/organisms/Figure';
import { TEMPERATURES } from '@/app/services/events/changeTemperature';
import { TextElement } from '../organisms/TextElement';
import Icon from '@mdi/react';
import {
  mdiMoonFull,
  mdiSunAngle,
  mdiSunAngleOutline,
  mdiWeatherNight,
} from '@mdi/js';
import './ForecastWeatherWidgetPage.scss';
import { getNextDayByStringDate } from '@/app/services/date/getNextDayByStringDate';

const ForecastWeatherWidgetPage = () => {
  const dispatch = useAppDispatch();
  const { loading, weather, astro } = useAppSelector(
    (state) => state.forecastWeatherAstro
  );
  const [useFarenheit, setUseFarenheit] = useState(false);

  const nextDayDate = useMemo(() => getNextDayByStringDate(), [loading]);

  useEffect(() => {
    getLocation()
      .then((position) => {
        const axiosService = new AxiosHttpService(WEATHER_API_URL);
        const httpClient = new HttpClientService(axiosService);

        dispatch(
          fetchWeatherForecastAstroByLocation({
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

  useEffect(() => {
    const handleTemperatureChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: TEMPERATURES }>;
      const { type } = customEvent.detail;

      setUseFarenheit(type === TEMPERATURES.FARENHEIT);
    };

    window.addEventListener('onTemperatureChange', handleTemperatureChange);

    return () => {
      window.removeEventListener(
        'onTemperatureChange',
        handleTemperatureChange
      );
    };
  }, []);

  return (
    <div data-testid='forecast-weather-widget' style={{ height: '100%' }}>
      <div className='card_container is-flex is-flex-direction-column is-justify-content-space-between'>
        <Box
          className={`is-flex is-justify-content-space-between card_container_content ${loading ? 'is-skeleton' : ''}`}
          render={() => (
            <>
              <div className='is-align-self-flex-start'>
                <p className='is-size-4 has-text-weight-medium'>Tomorrow</p>
                {nextDayDate}
              </div>
              <div className='is-align-self-flex-end'>
              <figure
                  className={`card_image image is-128x128 mb-1${loading ? 'is-skeleton' : ''}`}
                >
                  <img
                    alt='Weather Image'
                    src={
                      weather?.forecast?.forecastday.at(-1)?.day?.condition
                        ?.icon.replace(
                          '64x64',
                          '128x128'
                        )
                    }
                  />
                </figure>
                <p className='is-size-6 has-text-right'>
                  {weather?.forecast?.forecastday.at(-1)?.day?.condition?.text}
                </p>
                <p className='is-size-3 has-text-weight-semibold has-text-right'>
                  {useFarenheit
                    ? `${weather?.forecast?.forecastday.at(-1)?.day?.avgtemp_f}°F`
                    : `${weather?.forecast?.forecastday.at(-1)?.day?.avgtemp_c}°C`}
                </p>
               
              </div>
            </>
          )}
        />
        <Box
          className={`is-flex is-flex-wrap-wrap is-justify-content-space-between ${loading ? 'is-skeleton' : ''}`}
          render={() => (
            <>
              <div className='is-flex is-justify-content-space-between is-align-items-center'>
                <figure className={`image is-48x48 mr-2`}>
                  <Icon
                    path={mdiSunAngleOutline}
                    title='User Profile'
                    size={2}
                  />
                </figure>
                <TextElement
                  primary='Sunrise'
                  secondary={astro?.astronomy?.astro?.sunrise || ''}
                />
              </div>

              <div className='is-flex is-justify-content-space-between is-align-items-center'>
                <figure className={`image is-48x48 mr-2`}>
                  <Icon path={mdiSunAngle} title='User Profile' size={2} />
                </figure>
                <TextElement
                  primary='Sunset'
                  secondary={astro?.astronomy?.astro?.sunset || ''}
                />
              </div>

              <div className='is-flex is-justify-content-space-between is-align-items-center'>
                <figure className={`image is-48x48 mr-2`}>
                  <Icon path={mdiMoonFull} title='User Profile' size={2} />
                </figure>
                <TextElement
                  primary='Moonrise'
                  secondary={astro?.astronomy?.astro?.moonrise || ''}
                />
              </div>

              <div className='is-flex is-justify-content-space-between is-align-items-center'>
                <figure className={`image is-48x48 mr-2`}>
                  <Icon path={mdiWeatherNight} title='User Profile' size={2} />
                </figure>
                <TextElement
                  primary='Moonset'
                  secondary={astro?.astronomy?.astro?.moonset || ''}
                />
              </div>
            </>
          )}
        />
        <div
          data-testid='forecast-weather-widget-cards'
          className={`box is-flex card_tabs_gap card_tabs_scroll ${loading ? 'is-skeleton' : ''}`}
        >
          {weather?.forecast?.forecastday[0] &&
            weather?.forecast?.forecastday[0].hour.length >= 1 &&
            weather?.forecast?.forecastday[0].hour.map((w) => {
              return (
                <Figure
                  key={w?.time_epoch}
                  className={`${loading ? 'is-skeleton' : ''}`}
                  //TODO: AVOID RENDER PROBLEM
                  primaryLabel={getTimeByStringDate(w?.time)}
                  secondaryLabel={
                    useFarenheit ? `${w?.temp_f}°F` : `${w?.temp_c}°C`
                  }
                  imageSrc={w?.condition?.icon}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export { ForecastWeatherWidgetPage };
