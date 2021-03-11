import highChartsOptions from "./config/highChartsOptions";

export default {

  // Die Highchart API hat eine umfangreiche API und Objektstruktur. Viele Attribute bestehen aus genesteten Objekte.
  //Mit Diesen Mutationen können bis zur dritten Ebene zugegriffen werden,
  // Falls mehr nötig sein sollten, können welche hinzugefügt werdn.

  changePropertyWithOneKey(state, {first_key, data}) {
    state.highChartsOptions[first_key] = data

  },
  changePropertyWithTwoKeys(state, {first_key, second_key, data}) {
    state.highChartsOptions[first_key][second_key] = data

  },
  changePropertyWithThreeKeys(state, {first_key, second_key, third_key, data}) {
    state.highChartsOptions[first_key][second_key][third_key] = data

  },
  changePropertyWithKeyIndex(state, {first_key, first_index, data}) {
    state.highChartsOptions[first_key][first_index] = data
  },
  changePropertyWithKeyIndexKey(state, {first_key, second_key, first_index, data}) {
    state.highChartsOptions[first_key][first_index][second_key] = data

  },
  changePropertyWithKeyIndexKeyKey(state, {first_key, first_index, second_key, third_key, data}) {
    state.highChartsOptions[first_key][first_index][second_key][third_key] = data
  },
  changePropertyWithKeyIndexKeyIndexKey(state, {first_key, second_index, first_index, second_key, third_key, data}) {
    state.highChartsOptions[first_key][first_index][second_key][second_index][third_key] = data
  },

  changePropertyWithFourKeys(state, {first_key, second_key, third_key, fourth_key, data}) {
    state.highChartsOptions[first_key][second_key][third_key][fourth_key] = data
  },

  setChartsList(state, payload) {
    state.chartList = payload.reverse()
  },

  setChart(state, payload) {
    state.highChartsOptions = payload.payload;
  },

  setUser(state) {
    state.isBeginner = !state.isBeginner;
    localStorage.setItem('user', state.isBeginner.toString());
  },
  setPathName(state, payload) {
    state.pathName = payload.pathname
  },
  deleteChart(state, payload) {
    state.chartList = state.chartList.filter(item => item.id !== payload.id).reverse()
  },
  resetForm(state) {
    state.highChartsOptions = {
      plotOptions: {
        series: {
          animation: false
        }
      },
      title: {
        text: "Das ist mein Titel"
      },
      series: []
    }
  },
  removeSeries(state, payload) {
    if(payload){
      state.highChartsOptions.series.splice(payload,1);
    } else {
      state.highChartsOptions.series = [];
    }
  },
  setDataList(state, payload) {
    state.dataList = payload;
  },
  setDataIsValid(state, payload){
    state.dataIsValid = payload;
  },
  setTab(state, payload){
    state.tabs.selected = payload;
    state.tabs.data.forEach(tab => {
      tab.isActive = tab.name === payload;
    })
  }
}

// daten senden -> speihert erstmal in db -> chartlist wirdw eitergeführt