import { createApp } from 'vue';
import App from './App.vue';
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';

const app = createApp(App);
app.use(VueHighcharts, { Highcharts });
export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    app.mount('#widget')
  })
}
