<template>
  <div class="form-check mb-3">
    <input id="reverse_yAxis" v-model="reversed" type="checkbox" class="form-check-input"/>
    <label for="reverse_yAxis">Y-Achse Werte inversieren</label>
  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed,ref,watch } from "vue";
  export default {
    setup(){
      const store = useStore();
      const hasReversed = computed(function () {
        return store.getters.highChartsOptions.yAxis?.reversed ?
          store.getters.highChartsOptions.yAxis.reversed : false;
      })
      const reversed = ref(hasReversed.value)
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.yAxis){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'yAxis',
          data: {}
        })
      }
      if(!highChartsOptions.value.yAxis.reversed){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'yAxis',
          second_key: 'reversed',
          data: false
        })
      }

      watch(reversed, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'yAxis',
          second_key: 'reversed',
          data: newValue
        })
      })


      return { reversed }
    }
  }
</script>