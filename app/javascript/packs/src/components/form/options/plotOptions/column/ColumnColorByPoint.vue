<template>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="plotOptions_column_color_by_point" v-model="enableColorByPoint">
    <label for="plotOptions_column_color_by_point" class="form-check-label">Farbe für jeden Datenpunkt</label>
  </div>
</template>

<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup(){
      const store = useStore();
      const enableColorByPoint = ref(false);
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