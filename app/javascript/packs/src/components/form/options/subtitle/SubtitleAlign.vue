<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="subtitle_align" class="mt-2">Ausrichtung</label>
    </div>
    <div class="col-8">
      <select id="subtitle_align" class="form-select" v-model="alignSelected">
        <option v-for="align in alignOptions" :value="align.value" :key="align.text">{{align.text}}</option>
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
      const hasAlign = computed(function () {
        return store.getters.highChartsOptions.subtitle?.align ? store.getters.highChartsOptions.subtitle.align : 'center'
      })
      const alignSelected = ref(hasAlign.value);
      const alignOptions = computed(function(){ return store.getters.subtitleConfiguration.align })
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.subtitle) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'subtitle',
          data: {}
        })
      }

      if(!highChartsOptions.value.subtitle.align) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'align',
          data: 'center'
        })
      }

      watch(alignSelected, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'align',
          data: newValue
        })
      })


      return { alignSelected, alignOptions }
    }
  }
</script>