<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="opposite_xAxis" >Invertieren</label>
    </div>
    <div class="col-8">
      <input id="opposite_xAxis" v-model="opposite" type="checkbox"/>
    </div>

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