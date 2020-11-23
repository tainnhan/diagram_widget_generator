export default {
  changeChartsProperties( context, payload ) {
    context.commit('changeChartsProperties', payload )
  },
  changeSeriesDataAttribute(context, payload ) {
    context.commit('changeSeriesDataAttribute', payload )
  },
  changePlotOptions(context, payload) {
    context.commit('changePlotOptions', payload )
  },
  setPage(context, payload) {
    context.commit('setPage', payload )
  }
}