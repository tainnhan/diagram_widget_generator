<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="plotOptions_column_color_by_point" class="mt-2">Farbe für jeden Datenpunkt</label>
    </div>
    <div class="col-8">
      <input type="checkbox" id="plotOptions_column_color_by_point" v-model="enableColorByPoint">
    </div>
  </div>

</template>

<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup(){
      const store = useStore();
      const hasEnableColorPoint = computed(function () {
        return store.getters.highChartsOptions.plotOptions?.column?.colorByPoint ?
          store.getters.highChartsOptions.plotOptions.column.colorByPoint :
          false
      })
      const enableColorByPoint = ref(hasEnableColorPoint.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions;
      })

      if(!highChartsOptions.value.plotOptions) {
        store.dispatch('changePropertyWithOneKey',{
          first_key: 'plotOptions',
          data: {}
        })
      }
      if(!highChartsOptions.value.plotOptions.column) {
        store.dispatch('changePropertyWithTwoKeys',{
          first_key: 'plotOptions',
          second_key: 'column',
          data: {}
        })
      }
      if(!highChartsOptions.value.plotOptions.column.colorByPoint) {
        store.dispatch('changePropertyWithThreeKeys',{
          first_key: 'plotOptions',
          second_key: 'column',
          third_key: 'colorByPoint',
          data: false
        })
      }

      watch(enableColorByPoint, function (newValue) {
        store.dispatch('changePropertyWithThreeKeys',{
          first_key: 'plotOptions',
          second_key: 'column',
          third_key: 'colorByPoint',
          data: newValue
        })
      })
      return {enableColorByPoint};
    }
  }
</script>