import { createStore  } from 'vuex';
import getters from './getters';
import actions from "./actions";
import mutations from "./mutations";

import titleSubtitle from "./config/titleSubtitle";
import chartTypes from "./config/chartTypes";
import highChartsOptions from "./config/highChartsOptions";

const store = createStore({
  state() {
    return {
      titleSubtitle,
      chartTypes,
      highChartsOptions
    }
  },
  getters,
  mutations,
  actions
});

export default store;