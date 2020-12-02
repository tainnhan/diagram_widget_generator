<template>
  <div class="form-check mb-3">
    <input class="form-check-input" id="checkbox_marker" type="checkbox" v-model="enableMarkers"/>
    <label class="form-check-label" for="checkbox_marker">Marker anzeigen</label>
  </div>
</template>

<script>
  import { ref, watch, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();
      const highChartsOptions = computed(function (){ return store.getters.highChartsOptions })
      const enableMarkers = ref(true);

      if(!highChartsOptions.value.plotOptions) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'plotOptions',
          data: {}
        })
      }

      if(!highChartsOptions.value.plotOptions.series){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          data: {}
        })
      }

      if(!highChartsOptions.value.plotOptions.series.marker){
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          third_key: 'marker',
          data: {}
        })
      }

      watch(enableMarkers, function (newValue) {
        store.dispatch('changePropertyWithFourKeys', {
          first_key: 'plotOptions',
          second_key: 'series',
          third_key: 'marker',
          fourth_key: 'enabled',
          data: newValue
        })
      })


      return { enableMarkers }
    }
  }
</script>