<template>
  <div>
    <label for="chart_type">Chart</label>
    <select id="chart_type" class="form-select" v-model="chart.typeSelected">
      <option v-for="chart in chartConfiguration.type" :value="chart.value" :key="chart.text">{{chart.text}}</option>
    </select>
  </div>
</template>

<script>
  import { reactive, watch, computed } from "vue";
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore()
      const chartConfiguration = store.getters.chartConfiguration;
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })
      const chart = reactive({ typeSelected: 'line' })


      if(!highChartsOptions.value.chart){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'chart',
          data: {}
        })
      }

      watch(chart, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
            first_key: 'chart',
            second_key: 'type',
            data: newValue.typeSelected
          }
        )
      })
      return { chart, chartConfiguration }
    }

  }
</script>