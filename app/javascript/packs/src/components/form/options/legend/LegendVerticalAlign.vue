<template>
  <div class="mb-3">
    <label class="form-label" for="legend_vertical_align">Legende Vertikale Ausrichtung</label>
    <select id="legend_vertical_align" class="form-select" v-model="selectedVerticalAlign">
      <option v-for="align in options" :value="align.value">{{ align.name }}</option>
    </select>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasLegendVerticalAlign = computed(function () {
        return store.getters.highChartsOptions.legend?.verticalAlign ?
          store.getters.highChartsOptions.legend?.verticalAlign :
          'horizontal'
      })
      const selectedVerticalAlign = ref(hasLegendVerticalAlign.value); // default value
      const options = computed(function () {return store.getters.legendConfiguration.verticalAlign })
      const highChartsOptions = computed(function () {return store.getters.highChartsOptions })

      if(!highChartsOptions.value.legend){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'legend',
          data: {}
        })
      }

      if(!highChartsOptions.value.legend.verticalAlign){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'verticalAlign',
          data: 'bottom'
        })
      }

      watch(selectedVerticalAlign, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'verticalAlign',
          data: newValue
        })
      })

      return { selectedVerticalAlign, options }
    }
  }

</script>