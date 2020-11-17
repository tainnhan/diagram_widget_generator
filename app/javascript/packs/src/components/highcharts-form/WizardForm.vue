<template>
  <div class="card">
    <div class="card-body">
      <component :is="selectedComponent.value"></component>
      <button class="btn btn-primary" @click="selectComponent">Weiter</button>
    </div>
  </div>
</template>
<script>
  import {  reactive } from 'vue';
  import InputGeneral from "../highcharts-form/highcharts-form-parts/InputGeneral";
  import InputData from '../highcharts-form/highcharts-form-parts/InputData';
  import InputAxes from '../highcharts-form/highcharts-form-parts/InputAxes';
  import InputSeries from '../highcharts-form/highcharts-form-parts/InputSeries';
  import InputLegend from '../highcharts-form/highcharts-form-parts/InputLegend';
  import InputTooltip from '../highcharts-form/highcharts-form-parts/InputTooltip';
  import InputCredits from '../highcharts-form/highcharts-form-parts/InputCredits';

  export default {
    components: {
      InputGeneral, InputData, InputAxes, InputSeries, InputLegend, InputTooltip, InputCredits
    },
    setup() {
      const selectedComponent = reactive({
        index: 0,
        value: 'InputGeneral'
      })
      const allFormComponents = [
        'InputGeneral','InputData',
        'InputAxes', 'InputSeries',
        'InputLegend', 'InputTooltip', 'InputCredits'
      ];

      function selectComponent(){
        if(selectedComponent.index < 6) {
          selectedComponent.index += 1;
          selectedComponent.value = allFormComponents[selectedComponent.index];
        }
      }
      return {
        selectedComponent,
        selectComponent
      }
    }
  }

</script>