<template>
  <div class="mb-3">
    <label class="form-label" for="legend_layout">Layout</label>
    <select id="legend_layout" class="form-select" v-model="selectedLegendLayout">
      <option v-for="layout in options" :value="layout.value">{{ layout.name }}</option>
    </select>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasLegendLayout = computed(function () {
        return store.getters.highChartsOptions.legend?.layout ?
          store.getters.highChartsOptions.legend?.layout :
          'horizontal'
      })
      const selectedLegendLayout = ref(hasLegendLayout.value); // default value
      const options = computed(function () {return store.getters.legendConfiguration.layout })
      const highChartsOptions = computed(function () {return store.getters.highChartsOptions })

      if(!highChartsOptions.value.legend){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'legend',
          data: {}
        })
      }

      if(!highChartsOptions.value.legend.layout){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'layout',
          data: 'horizontal'
        })
      }

      watch(selectedLegendLayout, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'layout',
          data: newValue
        })
      })

      return { selectedLegendLayout, options }
    }
  }

</script>