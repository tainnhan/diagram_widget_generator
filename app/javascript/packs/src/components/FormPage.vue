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
  import WizardForm from './form/WizardForm';
  import HighChartsPreview from './highcharts/HighchartsPreview';
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
  export default {
    components: {
      WizardForm,
      HighChartsPreview
    }
  }
</script>