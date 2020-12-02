<template>
  <div>
    <label for="series_color" class="form-label" > Farbe für die Daten</label>
    <input style="max-width: 100%"  v-model="color" id="series_color" type="color" class="form-control-color w-100">
  </div>
</template>

<script>
  import { ref,computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    props: {
      color: {
        type: String,
        required: true
      },
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
      const updatedColor = computed(function () {
        return props.color;
      })
      const color = ref(updatedColor.value);


      watch(updatedColor, function (newValue) {
        color.value = newValue;
      })

      watch(color, function (newValue) {
        store.dispatch('changePropertyWithKeyIndexKey', {
          first_key: 'series',
          first_index: props.selected,
          second_key: 'color',
          data: newValue
        })
      })

      return { color, updatedColor }
    }
  }
</script>