<template>
  <div class="mb-3">
    <label for="background_color_tooltip" class="form-label">Hintergrundfarbe</label>
    <input
            id="background_color_tooltip"
            type="color"
            class="form-control-color form-color"
            v-model="backgroundColorTooltip"
    />
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasTooltipBackgroundColor = computed(function () {
        return store.getters.highChartsOptions.tooltip?.backgroundColor ?
          store.getters.highChartsOptions.tooltip?.backgroundColor :
          '#f7f7f7'
      })
      const backgroundColorTooltip = ref(hasTooltipBackgroundColor.value)
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.backgroundColor){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'backgroundColor',
          data: "#f7f7f7"
        })
      }

      watch(backgroundColorTooltip, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'backgroundColor',
          data: newValue
        })
      })

      return { backgroundColorTooltip }
    }
  }

</script>

<style scoped>
  .form-color {
    width: 100%;
    max-width: 100%;
  }
</style>