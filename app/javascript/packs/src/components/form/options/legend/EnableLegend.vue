<template>
  <div class="form-check">
    <input id="enable_legend" class="form-check-input" type="checkbox" v-model="enableLegend">
    <label for="enable_legend" class="form-check-label">Legende anzeigen</label>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasEnableLegend = computed(function () {
        return store.getters.highChartsOptions.legend?.enabled ?
          store.getters.highChartsOptions.legend?.enabled :
          true
      })
      const enableLegend = ref(hasEnableLegend.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.legend){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'legend',
          data: {}
        })
      }

      if(!highChartsOptions.value.legend.enabled){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'enabled',
          data: true
        })
      }

      watch(enableLegend, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'enabled',
          data: newValue
        })
      })

      return { enableLegend }
    }
  }

</script>