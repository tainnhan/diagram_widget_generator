<template>
  <div class="card-body">
    <div class="mx-5 text-center">
      <h3 class="mt-2"><strong>Diagrammart</strong></h3>
      <p>Bitte wählen sie aus den untenstehenden Diagrammen einen Typ aus. Diese Diagrammart wird in ihrem Projekt angewendet. </p>
      <div class="mt-3">
        <chart-type-wizard @isClicked="isClicked"></chart-type-wizard>
      </div>
    </div>
  </div>
  <div class="card-footer overflow-auto">
    <button
      class="btn btn-primary float-left"
      @click="nextScreen('first-screen')"
    > Zurück</button>
    <button
            :disabled="isDisabled"
            class="btn btn-primary float-right"
            @click="nextScreen('third-screen')">Weiter
    </button>
  </div>

</template>

<script>
  import { useStore } from "vuex"
  import chartTypeWizard from "../highcharts/options/chart/chartTypeWizard";
  import { ref } from 'vue';
  export default {
    components: {
      chartTypeWizard
    },
    emits:['changeScreen'],
    setup(props, { emit }){
      const store = useStore();
      const isDisabled = ref(!store.getters.highChartsOptions.chart?.type);
      function isClicked() {
        isDisabled.value = false
      }

      const chartClass = function (item) {
        return `fas fa-chart-${item.fontawesome} fa-5x`
      }

      function nextScreen(screen) {
        emit('changeScreen', screen);
      }


      return { chartClass, nextScreen, isDisabled, isClicked }

    }
  }
</script>