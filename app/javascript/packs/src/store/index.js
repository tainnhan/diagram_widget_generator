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
      isBeginner: true,
      chartList: [],
      pathName: '',
      doEdit: false,
      exampleData: {
        series: [{name: "1990", data: [["Äpfeln", 10.2], ["Bananen", 9.8], ["Weintrauben", 30.2]], turboThreshold: 0}],
        csv: "null;1990\nEuropa;10.2\nAmerika;9.8\nAfrika;30.2\n"
      },
    }
  },
  getters,
  mutations,
  actions
});


export default store;