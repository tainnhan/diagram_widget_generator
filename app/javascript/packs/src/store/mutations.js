export default {
  changeChartsProperties(state, payload) {
    state.highChartsOptions[payload.property] = payload.data;
    console.log(state.highChartsOptions)
  }
}