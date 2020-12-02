<template>
  <div class="form-check mb-3">
    <input id="opposite_yAxis" v-model="opposite" type="checkbox" class="form-check-input"/>
    <label for="opposite_yAxis" >Y-Achse invertieren</label>
  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed,ref,watch } from "vue";
  export default {
    setup(){
      const store = useStore();
      const opposite = ref(false)
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.yAxis){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'yAxis',
          data: {}
        })
      }
      if(!highChartsOptions.value.yAxis.opposite){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'yAxis',
          second_key: 'opposite',
          data: false
        })
      }

      watch(opposite, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'yAxis',
          second_key: 'opposite',
          data: newValue
        })
      })


      return { opposite }
    }
  }
</script>