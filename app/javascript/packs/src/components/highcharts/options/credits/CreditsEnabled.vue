<template>

  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label class="mt-2">Credits anzeigen</label>

    </div>
    <div class="col-8">
      <input id="enable_credits" type="checkbox" v-model="enableCredits"/>

    </div>
  </div>

</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasEnableCredits = computed(function () {
        return store.getters.highChartsOptions.credits?.enabled ?
          store.getters.highChartsOptions.credits.enabled : true;
      })

      const enableCredits = ref(hasEnableCredits.value);
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.credits){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'credits',
          data: {}
        })
      }

      if(!highChartsOptions.value.credits.enabled){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'credits',
          second_key: 'enabled',
          data: true
        })
      }

      watch(enableCredits, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'credits',
          second_key: 'enabled',
          data: newValue
        })
      })

      return { enableCredits }
    }
  }

</script>

