import { createRouter, createWebHistory } from "vue-router";
import FormPage from "./components/FormPage";
import IndexPage from "./components/IndexPage";
import InputGeneral from "./components/form/form-parts/InputGeneral";
import InputSeries from "./components/form/form-parts/InputSeries";
import InputData from "./components/form/form-parts/InputData";
import InputAxes from "./components/form/form-parts/InputAxes";
import InputLegend from "./components/form/form-parts/InputLegend";
import InputTooltip from "./components/form/form-parts/InputTooltip";
import InputCredits from "./components/form/form-parts/InputCredits";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/diagram', component: IndexPage },
    { path: '/diagram/new', component: FormPage },
    { path: '/diagram/edit/:id', component: FormPage, props: true },

    ]
})

export default router;