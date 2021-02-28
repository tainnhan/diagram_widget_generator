<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="enable_tooltip" class="mt-2">Tooltip anzeigen</label>
    </div>
    <div class="col-8">
      <input  id="enable_tooltip" type="checkbox" v-model="enableTooltip">
    </div>
  </div>

</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasEnableTooltip = computed(function () {
        return store.getters.highChartsOptions.tooltip?.enabled ?
          store.getters.highChartsOptions.tooltip?.enabled :
          true
      })
      const enableTooltip = ref(hasEnableTooltip.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.tooltip){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'tooltip',
          data: {}
        })
      }

      if(!highChartsOptions.value.tooltip.enabled){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'enabled',
          data: true
        })
      }

      watch(enableTooltip, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'tooltip',
          second_key: 'enabled',
          data: newValue
        })
      })

      return { enableTooltip }
    }
  }

</script>