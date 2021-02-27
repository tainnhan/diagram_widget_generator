<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="opposite_yAxis" >Invertieren</label>
    </div>
    <div class="col-8">
      <input id="opposite_yAxis" v-model="opposite" type="checkbox" />
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
        return store.getters.highChartsOptions.yAxis?.opposite ?
          store.getters.highChartsOptions.yAxis.opposite : false;
      })
      const opposite = ref(hasOpposite.value)
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