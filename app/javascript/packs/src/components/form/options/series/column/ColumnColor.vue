<!-- Funktioniert nur wenn die SERIE auch wirklich existiert-->

<template>
  <div class="mb-3">
    <label for="column_color" class="form-label">Farbe</label>
    <input
      id="column_color"
      type="color"
      class="form-control-color form-color"
      v-model="selectedColor"
    />
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
        const store = useStore()
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
          store.dispatch('changePropertyWithKeyIndexKey',  {
            first_key: 'series',
            first_index: selected.value,
            second_key: 'color',
            data: newValue
          })
        })
        return { selectedColor }


    }
  }
</script>

<style scoped>
  .form-color {
    width: 100%;
    max-width: 100%;
  }
</style>