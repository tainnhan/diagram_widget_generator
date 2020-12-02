<template>
<h3>Achsen Konfiguration</h3>
  <inverse-axis></inverse-axis>
  <!-- X-Axis -->
  <x-axis-title-text></x-axis-title-text>
  <x-axis-opposite></x-axis-opposite>
  <x-axis-reversed></x-axis-reversed>

  <!-- Y-Axis -->
  <y-axis-title-text></y-axis-title-text>
  <y-axis-opposite></y-axis-opposite>
  <y-axis-reversed></y-axis-reversed>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="continueForm"
  >Weiter</button>
</template>

<script>
  import { useStore } from 'vuex';
  import inverseAxis from "../options/chart/InverseAxis";
  import xAxisTitleText from "../options/xAxis/title/TitleText";
  import xAxisOpposite from "../options/xAxis/XAxisOpposite";
  import xAxisReversed from "../options/xAxis/XAxisReversed";
  import YAxisOpposite from "../options/yAxis/YAxisOpposite";
  import YAxisReversed from "../options/yAxis/YAxisReversed";
  import YAxisTitleText from "../options/yAxis/title/TitleText";
  export default {
    components: {
       xAxisTitleText, xAxisOpposite,
      xAxisReversed, inverseAxis, YAxisReversed, YAxisTitleText, YAxisOpposite
    },
    setup(){
      const store = useStore();

      function continueForm(){
        store.dispatch('setFormPart', {
          data: 'InputSeries'
        })
      }
      return { continueForm }
    }
  }
</script>