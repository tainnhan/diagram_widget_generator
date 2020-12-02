<template>
  <div class="mb-3">
    <label for="credits_links" class="form-label">Credits Verlinkung</label>
    <input id="credits_links" type="text" class="form-control" v-model="text"/>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const text = ref('');
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.credits){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'credits',
          data: {}
        })
      }

      if(!highChartsOptions.value.credits.href){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'credits',
          second_key: 'href',
          data: 'https://www.highcharts.com'
        })
      }

      watch(text, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'credits',
          second_key: 'href',
          data: newValue
        })
      })

      return { text }
    }
  }

</script>