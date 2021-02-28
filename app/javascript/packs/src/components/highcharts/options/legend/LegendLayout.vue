<template>

  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="form-label mt-2" for="legend_layout">Layout</label>
    </div>
    <div class="col-8">
      <select id="legend_layout" class="form-select" v-model="selectedLegendLayout">
        <option v-for="layout in options" :value="layout.value">{{ layout.name }}</option>
      </select>
    </div>
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