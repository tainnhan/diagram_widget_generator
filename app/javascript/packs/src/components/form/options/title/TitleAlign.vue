<template>
  <div class="mb-3">
    <label for="title_align">Ausrichtung Titel</label>
    <select id="title_align" class="form-select" v-model="alignSelected">
      <option v-for="align in alignOptions" :value="align.value" :key="align.text">{{align.text}}</option>
    </select>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const alignSelected = ref('center');
      const alignOptions = computed(function(){ return store.getters.titleConfiguration.align })
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.title) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'title',
          data: {}
        })
      }

      if(!highChartsOptions.value.title.align) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'align',
          data: 'center'
        })
      }

      watch(alignSelected, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'align',
          data: newValue
        })
      })


      return { alignSelected, alignOptions }
    }
  }
</script>