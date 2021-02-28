<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="form-label mt-2" for="area_marker_symbol">Symbol</label>
    </div>
    <div class="col-8">
      <select class="form-select" id="area_marker_symbol" v-model="selectedSymbol">
        <option v-for="symbol in symbols" :value="symbol">{{ symbol }}</option>
      </select>
    </div>
  </div>

</template>
<script>
  import { useStore } from 'vuex';
  import { ref, computed, watch } from 'vue';
  export default {
    props: {
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props){
      const store = useStore();
      const selected = computed(function () { return props.selected })
      const symbols = store.getters.seriesConfiguration.defaultSymbols;
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })
      const symbolOption = computed(function () {
        return store.getters.highChartsOptions.series[selected.value].marker?.symbol;
      })

      const symbol = computed(function () {
        return symbolOption.value ? symbolOption.value : symbols[selected.value % 5 ]
      })
      const selectedSymbol = ref(symbol.value)

      watch(symbol, function (newValue) {
        selectedSymbol.value = newValue
      })


      initializeMarkerObject(selected.value)

      watch(selected, function (newValue) {
        initializeMarkerObject(newValue)
      })


      watch(selectedSymbol, function (newValue) {
        store.dispatch('changePropertyWithKeyIndexKeyKey', {
          first_key: 'series',
          first_index: props.selected,
          second_key: 'marker',
          third_key: 'symbol',
          data: newValue
        })
      })




      function initializeMarkerObject(newValue){
        if(!highChartsOptions.value.series[selected.value].marker) {
          store.dispatch('changePropertyWithKeyIndexKey', {
            first_key: 'series',
            first_index: newValue,
            second_key: 'marker',
            data: {}
          })
        }

        if(!highChartsOptions.value.series[selected.value].marker.symbol) {
          store.dispatch('changePropertyWithKeyIndexKeyKey', {
            first_key: 'series',
            first_index: newValue,
            second_key: 'marker',
            third_key: 'symbol',
            data: symbol.value
          })
        }
      }


      return { symbols, selectedSymbol }
    }
  }
</script>