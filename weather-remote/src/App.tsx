import { Provider } from 'react-redux';
import { store } from './app/store';
import './styles/globals.scss';

// import { CurrentWeatherWidgetPage } from './components/pages/CurrentWeatherWidgetPage';
import { ForecastWeatherWidgetPage } from './components/pages/ForecastWeatherWidgetPage';

const App = () => (
  <Provider store={store}>
    {/* Root App */}
    {/* <CurrentWeatherWidgetPage /> */}
    <ForecastWeatherWidgetPage />
  </Provider>
);

export default App;
