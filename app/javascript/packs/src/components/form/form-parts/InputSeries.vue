<template>
  <div class="mb-3">
    <select id="series_select" class="form-select" v-model="selected">
      <option v-for="(data, index) in series" :value="index" :key="data.name + index"> {{ data.name }}</option>
    </select>
  </div>
  <component is="SeriesLine" :series="selectedSeries" :selected="selected"></component>
  <enabled-markers></enabled-markers>
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
  import enabledMarkers from "../options/plotOptions/series/marker/EnabledMarkers";
  import enableDataLabels from "../options/plotOptions/series/dataLabels/EnableDataLabels";
  import SeriesLine from "./type/SimpleSeriesLine";
  export default {
    components: {
      SeriesLine, enabledMarkers, enableDataLabels
    },
    setup() {
      const store = useStore();
      const selected =  ref(0);
      const series = computed(function () { return store.getters.highChartsOptions['series'] })
      const selectedSeries = computed(function () { return store.getters.highChartsOptions['series'][selected.value] })


      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputLegend'
        })
      }
      return { series, selected, selectedSeries, setFormPart }
    }
  }
</script>