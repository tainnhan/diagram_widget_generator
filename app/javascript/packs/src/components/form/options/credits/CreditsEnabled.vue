<template>
  <div class="form-check mb-3">
    <input id="enable_credits" class="form-check-input" type="checkbox" v-model="enableCredits"/>
    <label class="form-check-label">Credits anzeigen</label>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const enableCredits = ref(true);
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

