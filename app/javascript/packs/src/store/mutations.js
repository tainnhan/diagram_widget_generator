import highChartsOptions from "./config/highChartsOptions";

export default {
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

  setChartsList(state, payload){
    state.chartList = payload
  },
  setPathName(state, payload) {
    state.pathName = payload.pathname
  },
  deleteChart(state, payload) {
    state.chartList = state.chartList.filter(item => item.id !== payload.id).reverse()
  },
  editChart(state, payload) {
    const chart = state.chartList.filter(item => payload.id === item.id)
    state.highChartsOptions = chart[0].data
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
  },
  setDoEdit(state, payload){
    state.doEdit = payload.data
  }

}

// daten senden -> speihert erstmal in db -> chartlist wirdw eitergeführt