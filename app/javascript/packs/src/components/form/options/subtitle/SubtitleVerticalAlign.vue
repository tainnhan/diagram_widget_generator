<template>
  <div class="mb-3">
    <label for="vertical_title_align">Vertikale Ausrichtung Subtitel</label>
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
      const verticalAlignSelected = ref('top');
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