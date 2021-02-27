<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="series_area_color" class="form-label mt-2" > Farbe für die Daten</label>
    </div>
    <div class="col-8">
      <input style="max-width: 100%"  v-model="selectedColor" id="series_area_color" type="color" class="form-control-color w-100">
    </div>
  </div>
</template>

<script>
  import { ref,computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    props: {
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
      const selected = computed(function () { return props.selected })
      const colorOption = computed(function () {
        return store.getters.highChartsOptions.series[selected.value].color
      })
      const color = computed(function () {
        return colorOption.value ? colorOption.value : store.getters.seriesConfiguration.defaultColors[selected.value % 10]
      })

      const selectedColor = ref(color.value);
      watch(color, function (newValue) {
        selectedColor.value = newValue;
      })

      watch(selectedColor, function (newValue) {
        store.dispatch('changePropertyWithKeyIndexKey', {
          first_key: 'series',
          first_index: props.selected,
          second_key: 'color',
          data: newValue
        })
      })

      return { selectedColor }
    }
  }
</script>