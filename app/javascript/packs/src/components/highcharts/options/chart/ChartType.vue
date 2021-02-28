<template>
  <div>
    <label for="chart_type">Chart</label>
    <select id="chart_type" class="form-select" v-model="chart">
      <option v-for="chart in chartConfiguration.type" :value="chart.value" :key="chart.text">{{chart.text}}</option>
    </select>
  </div>
</template>

<script>
  import { ref, watch, computed } from "vue";
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore()
      const chartConfiguration = store.getters.chartConfiguration;
      const hasChartType = computed(function () {
        return store.getters.highChartsOptions.chart?.type ? store.getters.highChartsOptions.chart.type : 'line';
      })
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })
      const chart = ref(hasChartType.value);


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

      watch(chart, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
            first_key: 'chart',
            second_key: 'type',
            data: newValue
          }
        )
      })
      return { chart, chartConfiguration }
    }

  }
</script>