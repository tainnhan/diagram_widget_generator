import { createApp } from 'vue';
import App from './App.vue';
import Store from './store/index';
import { createRouter, createWebHistory } from "vue-router";
import FormPage from "./components/FormPage";
import IndexPage from "./components/IndexPage";
import loadExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
import loadData from 'highcharts/modules/data';
import VueHighcharts from 'vue-highcharts';
import ShowPage from "./components/pages/ShowPage";
loadExporting(Highcharts);

loadData(Highcharts);
const app = createApp(App);
app.use(VueHighcharts, { Highcharts });
app.use(Store);

export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const pathName = document.getElementById('widget').getAttribute('data-pathname');
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: pathName, component: IndexPage },
        { path: pathName + '/charts/new', component: FormPage },
        { path: pathName + '/charts/:id/edit', component: FormPage, props: true },
        { path: pathName + '/charts/:id', component: ShowPage, props: true },

      ]
    })
    app.use(router);
    app.mount('#widget')
  })
}