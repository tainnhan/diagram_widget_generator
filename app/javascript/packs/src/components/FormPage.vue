<template>
  <div class="row">
    <div class="col-md-6">
      <wizard-form></wizard-form>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
            <high-charts-preview></high-charts-preview>
        </div>
      </div>
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
    }
  }
</script>