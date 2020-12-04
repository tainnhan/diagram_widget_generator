<template>
  <div class="form-check mb-3">
    <input class="form-check-input" id="enable_shared_tooltip" type="checkbox" v-model="enableSharedTooltip">
    <label for="enable_shared_tooltip" class="form-check-label">Tooltips werden geteilt</label>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasTooltipShared = computed(function () {
        return store.getters.highChartsOptions.tooltip?.shared ?
          store.getters.highChartsOptions.tooltip?.shared :
          false
      })
      const enableSharedTooltip = ref(hasTooltipShared.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.shared){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'shared',
          data: false
        })
      }

      watch(enableSharedTooltip, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'shared',
          data: newValue
        })
      })

      return { enableSharedTooltip }
    }
  }

</script>