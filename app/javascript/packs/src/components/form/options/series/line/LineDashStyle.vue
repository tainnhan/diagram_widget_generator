<template>
  <div class="mb-3">
    <label class="form-label" for="dash_select">Dash Styling</label>
    <select class="form-select" id="dash_select" v-model="selectedDash">
      <option v-for="dash in dashStyle" :value="dash"> {{ dash }}</option>
    </select>
  </div>
</template>
<script>
  import { useStore  } from 'vuex';
  import { computed,ref, watch } from 'vue';
  export default {
    props: {
      dashStyle: {
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
      const dashStyle = store.getters.seriesConfiguration.dashStyle;
      const dash = computed(function () { return props.dashStyle  })
      const selectedDash = ref(dash.value)

      watch(dash, function (newValue) {
        selectedDash.value = newValue
      })

      watch(selectedDash, function (newValue) {
        store.dispatch('changeSeriesDataAttribute',{
          index: props.selected,
          attribute: 'dashStyle',
          data: newValue
        })
      })


      return { dashStyle, selectedDash }
    }
  }
</script>
