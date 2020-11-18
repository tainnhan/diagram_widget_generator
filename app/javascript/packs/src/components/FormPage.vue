<template>
  <div class="row">
    <div class="col-5">
      <wizard-form></wizard-form>
    </div>
    <div class="col-7 bg-light" :style="{height: windowHeight + 'px'}">
      <high-charts-preview></high-charts-preview>
    </div>
  </div>
</template>


<script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import WizardForm from './highcharts-form/WizardForm';
  import HighChartsPreview from './highcharts/HighchartsPreview';
  export default {
    components: {
      WizardForm,
      HighChartsPreview
    },
    setup() {
      const windowHeight = ref(window.innerHeight);


      function onResize() {
        windowHeight.value = window.innerHeight;
      }

      onMounted(function () {
        window.addEventListener('resize', onResize )
      })

      onUnmounted(function () {
        window.removeEventListener('resize', onResize)
      })

      return { windowHeight }
    }
  }
</script>