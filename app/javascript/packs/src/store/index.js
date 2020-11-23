import { createStore  } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import titleSubtitle from './config/titleSubtitle';
import chartTypes from './config/chartTypes';
import highChartsOptions from './config/highChartsOptions';

const store = createStore({
  state() {
    return {
      defaultSymbols: ['circle', 'square','diamond', 'triangle','triangle-down'],
      defaultColors: [
        '#7cb5ec', '#434348', '#90ed7d',
        '#f7a35c', '#8085e9', '#f15c80',
        '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
      ],
      dashStyle: [
        'Solid', 'ShortDash', 'ShortDot', 'ShortDashDot',
        'ShortDashDotDot', 'Dot', 'Dash', 'LongDash',
        'DashDot', 'LongDashDot', 'LongDashDotDot'
      ],
      page: 'IndexPage',
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