import { createApp } from 'vue';
import NewsWidget from '../components/NewsWidget.vue';

const mount = (el) => {
  const app = createApp(NewsWidget);
  app.mount(el);
};

export { mount };
