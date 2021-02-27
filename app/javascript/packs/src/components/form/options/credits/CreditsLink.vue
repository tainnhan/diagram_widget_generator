<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="credits_links" class="form-label mt-2">Credits Verlinkung</label>
    </div>
    <div class="col-8">
      <input id="credits_links" type="text" class="form-control" v-model="text"/>
    </div>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasCreditsText = computed(function () {
        return store.getters.highChartsOptions.credits?.href ?
          store.getters.highChartsOptions.credits.href : 'https://www.highcharts.com';
      })

      const text = ref(hasCreditsText.value);
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