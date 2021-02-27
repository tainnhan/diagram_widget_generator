<template>
  <div>
    <button v-for="chart in chartConfiguration.type" :key="chart.value" class="btn btn-light">
      <i
        :key="chart.value"
        :class="'text-secondary fas fa-chart-' + chart.fontawesome + ' fa-2x'"
        @click="changeChartType(chart.value)"></i>
    </button>
  </div>
</template>

<script>
  import { ref, watch, computed } from "vue";
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore()
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })
      const chartConfiguration = store.getters.chartConfiguration;


      if(!highChartsOptions.value.chart){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'chart',
          data: {}
        })
      }
      if(!highChartsOptions.value.chart.type){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'chart',
          second_key: 'type',
          data: 'line'
        })
      }

      function changeChartType(selectedChart){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'chart',
          second_key: 'type',
          data: selectedChart
        })
      }


      return { chartConfiguration,changeChartType }
    }

  }
</script>

<style scoped>
  i:hover{
    color: #5671d0 !important;
  }
</style>

