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
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props){
      const store = useStore();
      const selected = computed(function () { return props.selected })
      const dashStyle = store.getters.seriesConfiguration.dashStyle;
      const dashOption = computed(function () {
        return store.getters.highChartsOptions.series[selected.value].dashStyle
      })
      const dash = computed(function () {
        return dashOption.value ? dashOption.value : 'Solid'
      })

      const selectedDash = ref(dash.value)

      watch(dash, function (newValue) {
        selectedDash.value = newValue
      })

      watch(selectedDash, function (newValue) {
        store.dispatch('changePropertyWithKeyIndexKey',{
          first_key: 'series',
          first_index: props.selected,
          second_key: 'dashStyle',
          data: newValue
        })
      })


      return { dashStyle, selectedDash }
    }
  }
</script>
