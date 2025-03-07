import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { ForecastWeatherWidgetPage } from '@/components/pages/ForecastWeatherWidgetPage';

const ForecastWeatherWidget = () => {
  return (
    <Provider store={store}>
      <ForecastWeatherWidgetPage />
    </Provider>
  );
};

export default ForecastWeatherWidget;
