<template>
  <index-button></index-button>
  <high-chart-list></high-chart-list>
</template>
<script>
  import HighChartList from './highcharts/HighchartList';
  import IndexButton from "./UI/IndexButton";

  export default {
    components: {
      HighChartList,
      IndexButton
    },
    setup() {

    }
  }
</script>