<template>
  <h1 class="mb-3">Highcharts List</h1>
  <div class="row">
    <div class="col-6" v-for="n in 4">
      <high-charts-item></high-charts-item>
    </div>
  </div>
</template>

<script>
  import HighChartsItem from './HighchartsItem'
  export default {
    components: {
      HighChartsItem,
    },
    setup() {
    }
  }

</script>