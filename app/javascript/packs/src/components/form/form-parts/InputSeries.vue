<template>
  <div class="mb-3">
    <select id="series_select" class="form-select" v-model="selected">
      <option v-for="(data, index) in series" :value="index" :key="data.name + index"> {{ data.name }}</option>
    </select>
  </div>
  <component :is="chartType" :series="selectedSeries" :selected="selected"></component>
  <enable-data-labels></enable-data-labels>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import enableDataLabels from "../options/plotOptions/series/dataLabels/EnableDataLabels";
  import SeriesLine from "./type/SimpleSeriesLine";
  import SeriesColumn from "./type/SimpleSeriesColumn";
  import SeriesArea from "./type/SimpleSeriesArea";
  import SeriesPie from "./type/SimpleSeriesPie";
  export default {
    components: {
      SeriesLine, enableDataLabels, SeriesColumn, SeriesArea, SeriesPie
    },
    setup() {
      const store = useStore();
      const selected =  ref(0);
      const chartType = computed(function () {
        let type = store.getters.highChartsOptions.chart.type
        switch (type) {
          case 'line':
            return 'SeriesLine';
          case 'column':
            return 'SeriesColumn';
          case 'area' :
            return 'SeriesArea';
          case 'pie' :
            return 'SeriesPie';
        }
      })


      const series = computed(function () { return store.getters.highChartsOptions['series'] })
      const selectedSeries = computed(function () { return store.getters.highChartsOptions['series'][selected.value] })


      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputLegend'
        })
      }
      return { series, selected, selectedSeries, setFormPart, chartType }
    }
  }
</script>