<template>
  <div class="mb-3">
    <label for="xAxis_text" class="form-label">X-Achse Text</label>
    <input class="form-control" id="xAxis_text" type="text" v-model="text" >
  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed,ref,watch } from "vue";
  export default {
    setup(){
      const store = useStore();
      const hasTitle = computed(function () {
        return store.getters.highChartsOptions.xAxis?.title?.text ?
          store.getters.highChartsOptions.xAxis.title.text :
          '';
      })
      const text = ref(hasTitle.value)
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })




      if(!highChartsOptions.value.xAxis){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'xAxis',
          data: {}
        })
      }
      if(!highChartsOptions.value.xAxis.title){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'xAxis',
          second_key: 'title',
          data: {}
        })
      }
      if(!highChartsOptions.value.xAxis.title.text){
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'xAxis',
          second_key: 'title',
          third_key: 'text',
          data: ''
        })
      }

      watch(text, function (newValue) {
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'xAxis',
          second_key: 'title',
          third_key: 'text',
          data: newValue
        })
      })


      return { text }
    }
  }
</script>