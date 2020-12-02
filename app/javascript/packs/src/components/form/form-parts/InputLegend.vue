<template>
  <enable-legend></enable-legend>
  <legend-layout></legend-layout>
  <legend-align></legend-align>
  <legend-vertical-align></legend-vertical-align>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import enableLegend from "../options/legend/EnableLegend";
  import legendLayout from "../options/legend/LegendLayout";
  import legendAlign from "../options/legend/LegendAlign";
  import legendVerticalAlign from "../options/legend/LegendVerticalAlign";
  import { useStore } from "vuex";

  export default {
    components: {
      enableLegend, legendLayout, legendAlign, legendVerticalAlign
    },
    setup(){
        const store = useStore()
        function setFormPart() {
          store.dispatch('setFormPart', {
            data: 'InputTooltip'
          })
        }
      return {
        setFormPart
      }
    }
  }
</script>