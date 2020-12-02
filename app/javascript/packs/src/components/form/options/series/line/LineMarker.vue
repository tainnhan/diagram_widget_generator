<template>
  <line-marker-symbol :symbol="symbol" :selected="selected"></line-marker-symbol>
</template>
<script>
  import { useStore }  from 'vuex';
  import { computed, watch } from 'vue';
  import LineMarkerSymbol from "./marker/LineMarkerSymbol";
  export default {
    components: {
      LineMarkerSymbol,
    },
    props: {
      series: {
        type: Object,
        required: true
      },
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props){
      const store = useStore();
      const series = computed(function () { return props.series })
      const selected = computed(function () { return props.selected })
      initializeMarkerProperty()



      const symbol = computed(function () {
        return series.value.marker?.symbol ? series.value.marker.symbol : store.getters.seriesConfiguration.defaultSymbols[selected.value % 11]
      })


      watch(series,function () {
        initializeMarkerProperty()
      })

      function initializeMarkerProperty() {
        if(!series.value.marker) {
          store.dispatch('changePropertyWithKeyIndexKey', {
            first_key: 'series',
            first_index: props.selected,
            second_key: 'marker',
            data: {}
          })
        }
      }

      return { series, selected, symbol}
    }
  }
</script>