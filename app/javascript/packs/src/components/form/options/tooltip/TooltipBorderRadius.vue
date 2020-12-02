<template>
  <div class="mb-3">
    <label class="form-label" for="border_radius_tooltip">Border Radius</label>
    <input
      id="border_radius_tooltip"
      type="number"
      v-model="tooltipBorderRadius"
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
      const tooltipBorderRadius = ref(3);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.borderRadius){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderRadius',
          data: 3
        })
      }

      watch(tooltipBorderRadius, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'borderRadius',
          data: newValue
        })
      })

      return { tooltipBorderRadius }
    }
  }

</script>
