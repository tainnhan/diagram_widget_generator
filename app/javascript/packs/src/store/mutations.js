export default {
  changeChartsProperties(state, payload) {
      state.highChartsOptions[payload.property] = payload.data;
  },

  changePropertyWithOneKey(state, { first_key, data }){
    state.highChartsOptions[first_key] = data

  },
  changePropertyWithTwoKeys(state, { first_key, second_key, data }){
    state.highChartsOptions[first_key][second_key] = data

  },
  changePropertyWithThreeKeys(state, { first_key, second_key, third_key, data }){
    state.highChartsOptions[first_key][second_key][third_key] = data

  },
  changePropertyWithKeyIndex(state, { first_key, first_index, data }){
    state.highChartsOptions[first_key][first_index] = data

  },
  changePropertyWithKeyIndexKey(state, { first_key,second_key, first_index, data }){
    state.highChartsOptions[first_key][first_index][second_key] = data

  },
  changePropertyWithKeyIndexKeyKey(state, { first_key, first_index, second_key, third_key, data }){
    state.highChartsOptions[first_key][first_index][second_key][third_key] = data
  },
  changePropertyWithKeyIndexKeyIndexKey(state, { first_key,second_index, first_index, second_key, third_key, data }){
    state.highChartsOptions[first_key][first_index][second_key][second_index][third_key] = data
  },

  changePropertyWithFourKeys(state, { first_key, second_key, third_key, fourth_key,  data }){
    state.highChartsOptions[first_key][second_key][third_key][fourth_key] = data
  },

  changeChartOptions(state, payload) {
    state.highChartsOptions.chart[payload.attribute] = payload.data;
  },
  changeSeriesDataAttribute(state, payload ) {
    state.highChartsOptions.series[payload.index][payload.attribute] = payload.data
  },
  changePlotOptions(state, payload) {
    state.highChartsOptions.plotOptions[payload.property][payload.attribute] = payload.data;
  },
  setPage(state, payload) {
    state.page = payload.data;
  },
  setReload(state){
    state.reload = true;
  },
  setChartsList(state, payload){
    state.chartList = payload
  },
  setFormPart(state, payload) {
    state.formPart = payload.data
  },
  resetForm(state) {
    state.highChartsOptions = {
      plotOptions: {
        series: {
          animation: false
        }
      }
    }
  }

}

// daten senden -> speihert erstmal in db -> chartlist wirdw eitergeführt