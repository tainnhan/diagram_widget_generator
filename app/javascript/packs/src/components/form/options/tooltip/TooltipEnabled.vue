<template>
  <div class="form-check mb-3">
    <input class="form-check-input" id="enable_tooltip" type="checkbox" v-model="enableTooltip">
    <label for="enable_tooltip" class="form-check-label">Tooltip anzeigen</label>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const enableTooltip = ref(true);
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