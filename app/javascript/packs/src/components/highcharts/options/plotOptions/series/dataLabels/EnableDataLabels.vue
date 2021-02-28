<template>

  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="mt-2" for="checkbox_data_labels">Data Label anzeigen</label>
    </div>
    <div class="col-8">
      <input  type="checkbox" id="checkbox_data_labels" v-model="checkDataLabels">
    </div>
  </div>

</template>

<script>
  import { ref, watch, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();
      const highChartsOptions = computed(function (){ return store.getters.highChartsOptions })
      const hasDataLabels = computed(function () {
        return store.getters.highChartsOptions.plotOptions?.series?.dataLabels?.enabled ?
          store.getters.highChartsOptions.plotOptions?.series?.dataLabels?.enabled :
          false;
      })
      const checkDataLabels = ref(hasDataLabels.value);

      if(!highChartsOptions.value.plotOptions) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'plotOptions',
          data: {}
        })
      }

      if(!highChartsOptions.value.plotOptions.series){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          data: {}
        })
      }

      if(!highChartsOptions.value.plotOptions.series.dataLabels){
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          third_key: 'dataLabels',
          data: {}
        })
      }

      watch(checkDataLabels, function (newValue) {
        store.dispatch('changePropertyWithFourKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          third_key: 'dataLabels',
          fourth_key: 'enabled',
          data: newValue
        })
      })


      return { checkDataLabels }
    }
  }
</script>