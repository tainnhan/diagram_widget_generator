<template>
  <div class="mb-3">
    <label class="form-label" for="symbol_select">Symbol</label>
    <select class="form-select" id="symbol_select" v-model="selectedSymbol">
      <option v-for="symbol in defaultSymbols" :value="symbol">{{ symbol }}</option>
    </select>
  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { ref, computed, watch } from 'vue';
  export default {
    props: {
      symbol: {
        type: String,
        required: true
      },
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props){
      const store = useStore();
      const defaultSymbols = store.getters.seriesConfiguration.defaultSymbols;
      const symbol = computed(function () { return props.symbol })
      const selectedSymbol = ref(symbol.value)

      watch(symbol, function (newValue) {
        selectedSymbol.value = newValue
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

      return { defaultSymbols, selectedSymbol }
    }
  }
</script>