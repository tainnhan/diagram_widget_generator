import { createStore  } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import titleConfiguration from './config/title';
import subtitleConfiguration from './config/subtitle';
import seriesConfiguration from './config/seriesOptions'
import chartConfiguration from './config/chart';
import legendConfiguration from './config/legend';
import highChartsOptions from './config/highChartsOptions';

const store = createStore({
  state() {
    return {
      titleConfiguration,
      subtitleConfiguration,
      chartConfiguration,
      seriesConfiguration,
      legendConfiguration,
      highChartsOptions,
      formPart: 'InputGeneral',
      chartList: [],
      pathName: '',
      doEdit: false

    }
  },
  getters,
  mutations,
  actions
});


export default store;