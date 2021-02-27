<template>
  <div id="container" class="container mt-5">
    <index-button></index-button>
    <high-chart-list></high-chart-list>
  </div>
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