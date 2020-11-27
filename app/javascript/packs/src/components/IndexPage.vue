<template>
  <index-button></index-button>
  <high-charts-list></high-charts-list>
</template>
<script>
  import HighChartsList from './highcharts/HighchartsList';
  import IndexButton from "./UI/IndexButton";

  export default {
    components: {
      HighChartsList,
      IndexButton
    },
    setup() {

    }
  }
</script>