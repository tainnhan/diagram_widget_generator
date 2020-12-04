<template>
  <div class="mb-3">
    <label class="form-label" for="border_width_tooltip">Border Width</label>
    <input
      id="border_width_tooltip"
      type="number"
      v-model="tooltipBorderWidth"
      class="form-control"
    />
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasTooltipBorderWidth = computed(function () {
        return store.getters.highChartsOptions.tooltip?.borderWidth ?
          store.getters.highChartsOptions.tooltip?.borderWidth :
          1
      })
      const tooltipBorderWidth = ref(hasTooltipBorderWidth.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.borderWidth){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderWidth',
          data: 1
        })
      }

      watch(tooltipBorderWidth, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderWidth',
          data: newValue
        })
      })

      return { tooltipBorderWidth }
    }
  }

</script>

<style scoped>
  .form-color {
    width: 100%;
    max-width: 100%;
  }
</style>