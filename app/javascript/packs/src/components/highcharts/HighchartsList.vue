<template>
  <h1 class="mb-3">Highcharts List</h1>
  <div class="row">
    <div class="col-6" v-for="chart in list" :key="chart.id">
      <high-charts-item :options="chart.data" :chart-id="chart.id"></high-charts-item>
    </div>
  </div>
</template>

<script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import HighChartsItem from './HighchartsItem'
  export default {
    components: {
      HighChartsItem,
    },
    setup() {
      const store = useStore();

      const list = computed(function () {
        return store.getters.chartList.reverse();
      })

      onMounted(function () {
        store.dispatch('fetchCharts');
      })


      return { list }
    }
  }

</script>