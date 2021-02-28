<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="form-label mt-2" for="legend_align">Legende Ausrichtung</label>
    </div>
    <div class="col-8">
      <select id="legend_align" class="form-select" v-model="selectedLegendAlign">
        <option v-for="align in options" :value="align.value">{{ align.name }}</option>
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
      const hasLegendAlign = computed(function () {
        return store.getters.highChartsOptions.legend?.align ?
          store.getters.highChartsOptions.legend?.align :
          'center'
      })
      const selectedLegendAlign = ref(hasLegendAlign.value); // default value
      const options = computed(function () {return store.getters.legendConfiguration.align })
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
          second_key: 'align',
          data: 'center'
        })
      }

      watch(selectedLegendAlign, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'legend',
          second_key: 'align',
          data: newValue
        })
      })

      return { selectedLegendAlign, options }
    }
  }

</script>