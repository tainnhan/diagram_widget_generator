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
  import { useStore } from 'vuex';
  export default {
    props: ['id'],
    components: {
      WizardForm,
      HighChartsPreview
    },
     setup(props){
      const store = useStore();
      editChart()
      async function editChart() {
        if(props.id) {
          await store.dispatch('fetchCharts');
          const chart = store.getters.chartList.find(x => x.id === parseInt(props.id))

          if(chart) {
            await store.dispatch('editChart', {id: parseInt(props.id)})
          } else {
            console.log("Diese ID existiert nicht ")
          }
        }
      }
    }
  }
</script>