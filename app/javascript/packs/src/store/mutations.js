export default {
  changeChartsProperties(state, payload) {
      state.highChartsOptions[payload.property] = payload.data;
      console.log(state.highChartsOptions);
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