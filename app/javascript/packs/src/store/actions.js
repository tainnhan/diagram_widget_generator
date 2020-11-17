export default {
  changeChartsProperties( context, payload ) {
    console.log(payload)
    context.commit('changeChartsProperties', payload )
  }
}