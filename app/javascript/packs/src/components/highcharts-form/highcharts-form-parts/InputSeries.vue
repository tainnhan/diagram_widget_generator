<template>
  <div class="mb-3">
    <select id="series_select" class="form-select" v-model="selected">
      <option v-for="(data, index) in series" :value="index"> {{ data.name }}</option>
    </select>
  </div>
  <div>
    <label for="series_color" class="form-label" > Farbe für die Daten</label>
    <input style="max-width: 100%" v-model="selectedColor" id="series_color" type="color" class="form-control-color w-100">
  </div>
  <div class="mb-3">
    <label class="form-label" for="dash_select">Dash Styling</label>
    <select class="form-select" id="dash_select" v-model="selectedDash">
      <option v-for="dash in dashStyle" :value="dash"> {{ dash }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label class="form-label" for="symbol_select">Symbol</label>
    <select class="form-select" id="symbol_select" v-model="selectedSymbol">
      <option v-for="symbol in defaultSymbols" :value="symbol">{{ symbol }}</option>
    </select>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" id="checkbox_marker" type="checkbox" v-model="enableMarkers"/>
    <label class="form-check-label" for="checkbox_marker">Marker anzeigen</label>
  </div>
  <div class="form-check mb-3">
    <label class="form-check-label" for="checkbox_data_labels">Data Label anzeigen</label>
    <input class="form-check-input" type="checkbox" id="checkbox_data_labels" v-model="checkDataLabels">
  </div>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex'
  export default {
    setup() {
      const store = useStore();
      const defaultColors = store.getters.defaultColors;
      const dashStyle = store.getters.dashStyle;
      const defaultSymbols = store.getters.defaultSymbols;
      const selected = ref(0);
      const selectedColor = ref(`${ defaultColors[selected.value]}`);


      const series = store.getters.highChartsOptions['series'];

      for(let i = 0; i < series.length; i++){
        store.dispatch('changeSeriesDataAttribute', {
          index: i,
          attribute: 'color',
          data: defaultColors[i]
        })
      }

      for(let i = 0; i < series.length; i++){
        store.dispatch('changeSeriesDataAttribute', {
          index: i,
          attribute: 'dashStyle',
          data: dashStyle[0]
        })
      }

      for(let i = 0; i < series.length; i++){
        store.dispatch('changeSeriesDataAttribute', {
          index: i,
          attribute: 'marker',
          data: { symbol: null }
        })
      }

      watch(selected, function (newValue) {
        selectedColor.value = store.getters.highChartsOptions['series'][newValue].color
        selectedDash.value = store.getters.highChartsOptions['series'][newValue].dashStyle
        selectedSymbol.value = store.getters.highChartsOptions['series'][newValue].marker['symbol']
      })

      watch(selectedColor, function (newValue) {
        store.dispatch('changeSeriesDataAttribute', {
          index: selected.value,
          attribute: 'color',
          data: newValue
        })
      })

      const selectedDash = ref(`${dashStyle[0]}`)

      watch(selectedDash, function (newValue) {
        store.dispatch('changeSeriesDataAttribute', {
          index: selected.value,
          attribute: 'dashStyle',
          data: newValue
        })
      })

      const enableMarkers = ref(true);

      watch(enableMarkers, function (newValue) {
        store.dispatch('changePlotOptions', {
          property: 'series',
          attribute: 'marker',
          data: { enabled: newValue }
        })
      })

      const selectedSymbol = ref(null);

      watch(selectedSymbol, function (newValue) {
        store.dispatch('changeSeriesDataAttribute', {
          index: selected.value,
          attribute: 'marker',
          data: { symbol: newValue }
        })
      })


      const checkDataLabels = ref(false);

      watch(checkDataLabels, function (newValue) {
        store.dispatch('changePlotOptions', {
          property: 'series',
          attribute: 'dataLabels',
          data: { enabled: newValue }
        })
      })

      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputLegend'
        })
      }
      return {
        series, selected, defaultColors,
        selectedColor, dashStyle, selectedDash,
        enableMarkers, selectedSymbol, defaultSymbols,
        checkDataLabels, setFormPart
      }

    }
  }
</script>