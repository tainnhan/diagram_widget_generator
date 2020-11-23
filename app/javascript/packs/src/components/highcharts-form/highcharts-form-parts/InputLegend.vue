<template>
  <div class="form-check">
    <input id="enable_legend" class="form-check-input" type="checkbox" v-model="enableLegend">
    <label for="enable_legend" class="form-check-label">Legende anzeigen</label>
  </div>
  <div class="mb-3">
    <label class="form-label" for="legend_layout">Layout</label>
    <select id="legend_layout" class="form-select" v-model="selectedLegendLayout">
      <option v-for="layout in legendLayout" :value="layout.value">{{ layout.name }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label class="form-label" for="legend_align">Legende Ausrichtung</label>
    <select id="legend_align" class="form-select" v-model="selectedLegendAlign">
      <option v-for="align in legendAlign" :value="align.value">{{ align.name }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label class="form-label" for="legend_vertical_align">Legende Vertikale Ausrichtung</label>
    <select id="legend_vertical_align" class="form-select" v-model="selectedLegendVerticalAlign">
      <option v-for="align in legendVerticalAlign" :value="align.value">{{ align.name }}</option>
    </select>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { ref, watch } from 'vue';
  export default {
    setup(){
      const store = useStore();
      const enableLegend = ref(true)
      const selectedLegendLayout = ref('horizontal');
      const legendLayout = ref([
        { name: 'Horizontal', value: 'horizontal' },
        { name: 'Vertikal', value: 'vertical' },
        { name: 'In der Nähe der Daten', value: 'proximate' }
      ])

      const selectedLegendAlign = ref('center')
      const legendAlign = ref([
        { name: 'Zentrum', value: 'center' },
        { name: 'Links', value: 'left' },
        { name: 'Rechts', value: 'right' }
      ])

      const selectedLegendVerticalAlign = ref('bottom')
      const legendVerticalAlign = ref([
        { name: 'Oben', value: 'top' },
        { name: 'Mitte', value: 'middle' },
        { name: 'Unten', value: 'bottom' }
      ])

      watch([
        selectedLegendLayout,
        selectedLegendAlign,
        enableLegend,
        selectedLegendVerticalAlign
      ], function (newValue) {
        store.dispatch('changeChartsProperties', {
          property: 'legend',
          data: {
            layout: newValue[0],
            align: newValue[1],
            enabled: newValue[2],
            verticalAlign: newValue[3]
          }
        })
      })

      return {
        legendLayout, selectedLegendLayout,
        selectedLegendAlign, legendAlign,
        enableLegend , selectedLegendVerticalAlign, legendVerticalAlign
      }
    }
  }
</script>