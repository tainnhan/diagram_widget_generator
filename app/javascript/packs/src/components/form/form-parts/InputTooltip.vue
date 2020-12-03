<template>
  <tooltip-enabled></tooltip-enabled>
  <tooltip-shared v-if="chartType !== 'pie'"></tooltip-shared>
  <tooltip-background-color></tooltip-background-color>
  <tooltip-border-width></tooltip-border-width>
  <tooltip-border-radius></tooltip-border-radius>
  <tooltip-border-color></tooltip-border-color>
  <button
    type="button"
    class="btn btn-outline-primary mt-3 float-right"
    @click="setFormPart"
  >Weiter</button>
</template>
<script>
  import tooltipEnabled from "../options/tooltip/TooltipEnabled";
  import tooltipShared from "../options/tooltip/TooltipShared";
  import tooltipBackgroundColor from "../options/tooltip/TooltipBackgroundColor";
  import tooltipBorderWidth from "../options/tooltip/TooltipBorderWidth";
  import tooltipBorderRadius from "../options/tooltip/TooltipBorderRadius";
  import tooltipBorderColor from "../options/tooltip/TooltipBorderColor";
  import { useStore } from 'vuex';
  import { computed } from 'vue';



  export default {
    components: {
      tooltipEnabled, tooltipShared, tooltipBackgroundColor,
      tooltipBorderWidth, tooltipBorderRadius, tooltipBorderColor
    },
    setup(){
      const store = useStore();
      const chartType = computed(function () {
        return store.getters.highChartsOptions.chart?.type
      })
      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputCredits'
        })
      }

      return {
        setFormPart,
        chartType
      }
    }
  }
</script>
