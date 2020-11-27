<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <component :is="selectedComponent"></component>
        <button v-if="selectedComponent === 'InputCredits'"
          type="submit"
          class="btn btn-outline-primary mt-3 float-right"
        >Speichern</button>
      </form>
    </div>
  </div>
</template>
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
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
      const store = useStore();

      const selectedComponent = computed(function () {
        return store.getters.formPart
      })


      const formData = computed(function () {
        return store.getters.highChartsOptions;
      })

     async function submitForm() {
        await store.dispatch('submitForm', {
          data: formData.value
        });

        await store.dispatch('setPage', {
          data: 'IndexPage'
        })
      }

      return {
        selectedComponent,
        submitForm
      }
    }
  }

</script>