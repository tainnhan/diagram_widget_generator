<template>

  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="border_color_tooltip" class="form-label mt-2">Border Farbe</label>

    </div>
    <div class="col-8">
      <input
              id="border_color_tooltip"
              type="color"
              class="form-control-color form-color"
              v-model="tooltipBorderColor"
      />
    </div>
  </div>

</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasTooltipBorderColor = computed(function () {
        return store.getters.highChartsOptions.tooltip?.borderColor ?
          store.getters.highChartsOptions.tooltip?.borderColor :
          undefined
      })
      const tooltipBorderColor = ref(hasTooltipBorderColor.value)
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.borderColor){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderColor',
          data: undefined
        })
      }

      watch(tooltipBorderColor, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderColor',
          data: newValue
        })
      })

      return { tooltipBorderColor }
    }
  }

</script>

<style scoped>
  .form-color {
    width: 100%;
    max-width: 100%;
  }
</style>