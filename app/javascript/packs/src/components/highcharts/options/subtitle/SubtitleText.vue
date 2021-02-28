<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="subtitle" class="form-label mt-2">Text</label>
    </div>
    <div class="col-8">
      <input id="subtitle" class="form-control" type="text" v-model="subtitle"/>
    </div>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasSubtitle = computed(function () {
        return store.getters.highChartsOptions.subtitle?.text ? store.getters.highChartsOptions.subtitle.text : ''
      })
      const subtitle = ref(hasSubtitle.value);
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