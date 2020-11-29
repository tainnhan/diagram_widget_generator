import { createApp } from 'vue';
import App from './App.vue';
import Store from './store/index';
import Highcharts from 'highcharts';
import Router from './router';
import loadExporting from 'highcharts/modules/exporting';
import VueHighcharts from 'vue-highcharts';
loadExporting(Highcharts);


const app = createApp(App);
app.use(VueHighcharts, { Highcharts });
app.use(Store);
app.use(Router);
export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    app.mount('#widget')

  })
}
