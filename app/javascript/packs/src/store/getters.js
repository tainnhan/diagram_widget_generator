
export default {
  highChartsOptions(state) {
    return state.highChartsOptions;
  },
  titleConfiguration(state){
    return state.titleConfiguration;
  },
  subtitleConfiguration(state){
    return state.subtitleConfiguration;
  },
  legendConfiguration(state){
    return state.legendConfiguration
  },
  chartConfiguration(state){
    return state.chartConfiguration;
  },
  seriesConfiguration(state){
    return state.seriesConfiguration;
  },
  dashStyle(state){
    return state.dashStyle;
  },
  defaultSymbols(state){
    return state.defaultSymbols;
  },
  pathName(state){
    return state.pathName;
  },
  page(state){
    return state.page;
  },
  chartList(state) {
    return state.chartList
  },
  formPart(state) {
    return state.formPart
  },
  doEdit(state){
    return state.doEdit
  }
}