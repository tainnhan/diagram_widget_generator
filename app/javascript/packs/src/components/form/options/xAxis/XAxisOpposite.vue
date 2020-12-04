<template>
  <div class="form-check mb-3">
    <input id="opposite_xAxis" v-model="opposite" type="checkbox" class="form-check-input"/>
    <label for="opposite_xAxis" >X-Achse invertieren</label>
  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed,ref,watch } from "vue";
  export default {
    setup(){
      const store = useStore();

      const hasOpposite = computed(function () {
        return store.getters.highChartsOptions.xAxis?.opposite ?
          store.getters.highChartsOptions.xAxis.opposite : false;
      })

      const opposite = ref(hasOpposite.value);
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.xAxis){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'xAxis',
          data: {}
        })
      }
      if(!highChartsOptions.value.xAxis.opposite){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'xAxis',
          second_key: 'opposite',
          data: false
        })
      }

      watch(opposite, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'xAxis',
          second_key: 'opposite',
          data: newValue
        })
      })


      return { opposite }
    }
  }
</script>