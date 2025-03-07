import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { mount } from 'newsRemote/NewsWidget';
import styles from './Widgets.module.scss';

const CurrentWeatherWidgetRemoteComponent = dynamic(
  () => import('weatherRemote/CurrentWeatherWidget'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const ForecastWeatherWidgetRemoteComponent = dynamic(
  () => import('weatherRemote/ForecastWeatherWidget'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const Widgets = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(mount) {
      mount(ref.current);
    }
  }, []);

  return (
    <section className={styles.grid_container}>
      <div className={styles.grid_element}>
        <CurrentWeatherWidgetRemoteComponent />
        
      </div>
      <div className={styles.grid_element}>
        <ForecastWeatherWidgetRemoteComponent />
      </div>
      <div className={styles.grid_element} 
        //className='vue_element card'
      >
        <div ref={ref} />
      </div>
      <div className='coming_soon_element card'>...Coming Soong</div>
    </section>
  );
};

export { Widgets };
