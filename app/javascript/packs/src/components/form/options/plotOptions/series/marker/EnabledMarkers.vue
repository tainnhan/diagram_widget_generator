<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="mt-2" for="checkbox_marker">Marker anzeigen</label>
    </div>
    <div class="col-8">
      <input id="checkbox_marker" type="checkbox" v-model="enableMarkers"/>
    </div>
  </div>

</template>

<script>
  import { ref, watch, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();
      const highChartsOptions = computed(function (){ return store.getters.highChartsOptions })
      const hasEnableMarkers = computed(function () {
        return store.getters.highChartsOptions.plotOptions?.series?.marker?.enabled ?
          store.getters.highChartsOptions.plotOptions?.series?.marker?.enabled :
          true;
      })
      const enableMarkers = ref(hasEnableMarkers.value);

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