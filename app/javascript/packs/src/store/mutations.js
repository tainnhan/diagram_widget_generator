export default {
  changeChartsProperties(state, payload) {
      state.highChartsOptions[payload.property] = payload.data;
  },
  changeSeriesDataAttribute(state, payload ) {
    state.highChartsOptions.series[payload.index][payload.attribute] = payload.data
  },
  changePlotOptions(state, payload) {
    state.highChartsOptions.plotOptions[payload.property][payload.attribute] = payload.data;
  },
  setPage(state, payload) {
    state.page = payload.data;
  }
}