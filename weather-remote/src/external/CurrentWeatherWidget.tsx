import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { CurrentWeatherWidgetPage } from '@/components/pages/CurrentWeatherWidgetPage';

const CurrentWeatherWidget = () => {
  return (
    <Provider store={store}>
      <CurrentWeatherWidgetPage />
    </Provider>
  );
};

export default CurrentWeatherWidget;
