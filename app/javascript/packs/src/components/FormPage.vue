<template>
  <div class="row">
    <div class="col">
      <wizard-form ></wizard-form>
    </div>
    <div class="col">
      <high-charts-preview></high-charts-preview>
    </div>
  </div>
</template>


<script>
  import WizardForm from './highcharts-form/WizardForm';
  import HighChartsPreview from './highcharts/HighchartsPreview';
  export default {
    components: {
      WizardForm,
      HighChartsPreview
    },
  }
</script>