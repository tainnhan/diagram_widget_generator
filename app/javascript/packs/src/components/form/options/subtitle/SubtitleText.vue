<template>
  <div class="mb-3">
    <label for="title" class="form-label">Subtitel</label>
    <input id="title" class="form-control" type="text" v-model="subtitle"/>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const subtitle = ref('');
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.subtitle) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'subtitle',
          data: {}
        })
      }

      if(!highChartsOptions.value.subtitle.text) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'text',
          data: ''
        })
      }

      watch(subtitle, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'subtitle',
          second_key: 'text',
          data: newValue
        })
      })


      return { subtitle }
    }
  }
</script>