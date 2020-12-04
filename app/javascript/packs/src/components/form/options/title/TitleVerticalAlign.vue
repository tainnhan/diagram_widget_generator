<template>
  <div class="mb-3">
    <label for="vertical_title_align">Vertikale Ausrichtung Titel</label>
    <select id="vertical_title_align" class="form-select" v-model="verticalAlignSelected">
      <option v-for="align in verticalAlignOptions" :value="align.value" :key="align.text">{{align.text}}</option>
    </select>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasVerticalAlign = computed(function () {
        return store.getters.highChartsOptions.title?.verticalAlign ? store.getters.highChartsOptions.title.verticalAlign : 'top'
      })
      const verticalAlignSelected = ref(hasVerticalAlign.value);
      const verticalAlignOptions = computed(function(){ return store.getters.titleConfiguration.verticalAlign })
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.title) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'title',
          data: {}
        })
      }

      if(!highChartsOptions.value.title.verticalAlign) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'verticalAlign',
          data: 'top'
        })
      }

      watch(verticalAlignSelected, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'verticalAlign',
          data: newValue
        })
      })


      return { verticalAlignSelected, verticalAlignOptions }
    }
  }
</script>