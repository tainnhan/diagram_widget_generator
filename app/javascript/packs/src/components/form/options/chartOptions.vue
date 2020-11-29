<template>
  <div>
    <label for="chart_type">Chart</label>
    <select id="chart_type" class="form-select" v-model="chart.typeSelected">
      <option v-for="chart in chartConfiguration.type" :value="chart.value" :key="chart.text">{{chart.text}}</option>
    </select>
  </div>
</template>

<script>
  import { reactive, watch } from "vue";
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore()
      const chartConfiguration = store.getters.chartConfiguration;
      const chart = reactive({
        typeSelected: '',
      })

      watch(chart, function (newValue) {
        store.dispatch(
          'changeChartsProperties', {
            property: 'chart',
            data: {
              type: newValue.typeSelected
            }
          }
        )
      })
    return { chart, chartConfiguration }
    }

  }
</script>