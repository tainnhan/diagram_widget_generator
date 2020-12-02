export default {
  changeChartsProperties( context, payload ) {
    context.commit('changeChartsProperties', payload )
  },
  changeChartOptions(context, payload) {
    context.commit('changeChartOptions', payload)
  },
  changeSeriesDataAttribute(context, payload ) {
    context.commit('changeSeriesDataAttribute', payload )
  },
  changePlotOptions(context, payload) {
    context.commit('changePlotOptions', payload )
  },
  setPage(context, payload) {
    context.commit('setPage', payload )
  },
  async submitForm(context, payload) {
    const url = window.location.href + '/create';
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    const data = {
      options: payload.data
    };

    await fetch(url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(data)}).catch((error) => console.log(error))

    context.commit('setReload')
  },

  async fetchCharts(context) {
    const url = window.location.href + '/charts.json';
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        context.commit('setChartsList', data)
      })
      .catch((error) => console.log(error))
  },
  setFormPart(context, payload){
    context.commit('setFormPart', payload)
  },
  resetForm(context) {
    context.commit('resetForm')
  },
  changePropertyWithOneKey(context, payload){
    context.commit('changePropertyWithOneKey', payload)

  },
  changePropertyWithTwoKeys(context, payload){
    context.commit('changePropertyWithTwoKeys', payload)

  },
  changePropertyWithThreeKeys(context, payload){
    context.commit('changePropertyWithThreeKeys', payload)

  },
  changePropertyWithKeyIndex(context, payload){
    context.commit('changePropertyWithKeyIndex', payload)

  },
  changePropertyWithKeyIndexKey(context, payload){
    context.commit('changePropertyWithKeyIndexKey', payload)

  },
  changePropertyWithKeyIndexKeyKey(context, payload){
    context.commit('changePropertyWithKeyIndexKeyKey', payload)

  },
  changePropertyWithKeyIndexKeyIndexKey( context, payload){
    context.commit('changePropertyWithKeyIndexKeyIndexKey', payload)

  },
  changePropertyWithFourKeys(context, payload){
    context.commit('changePropertyWithFourKeys', payload)
  }
}