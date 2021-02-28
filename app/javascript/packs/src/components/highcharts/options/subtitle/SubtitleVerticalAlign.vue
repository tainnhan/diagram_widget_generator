<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="vertical_subtitle_align" class="mt-2">Ausr. Vertikal</label>
    </div>
    <div class="col-8">
      <select id="vertical_subtitle_align" class="form-select" v-model="verticalAlignSelected">
        <option v-for="align in verticalAlignOptions" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasVerticalAlign = computed(function () {
        return store.getters.highChartsOptions.subtitle?.verticalAlign ? store.getters.highChartsOptions.subtitle.verticalAlign : 'top'
      })
      const verticalAlignSelected = ref(hasVerticalAlign.value);
      const verticalAlignOptions = computed(function(){ return store.getters.subtitleConfiguration.verticalAlign })
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.subtitle) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'subtitle',
          data: {}
        })
      }

      if(!highChartsOptions.value.subtitle.verticalAlign) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'verticalAlign',
          data: 'top'
        })
      }

      watch(verticalAlignSelected, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'verticalAlign',
          data: newValue
        })
      })


      return { verticalAlignSelected, verticalAlignOptions }
    }
  }
</script>