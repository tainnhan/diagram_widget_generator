<template>
  <div class="mb-3">
    <label class="form-label" for="legend_align">Legende Ausrichtung</label>
    <select id="legend_align" class="form-select" v-model="selectedLegendAlign">
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
      const selectedLegendAlign = ref('center'); // default value
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