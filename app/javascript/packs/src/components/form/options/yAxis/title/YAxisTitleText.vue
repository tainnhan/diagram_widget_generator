<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="yAxis_text" class="form-label">Text</label>
    </div>
    <div class="col-8">
      <input class="form-control" id="yAxis_text" type="text" v-model="text" >
    </div>

  </div>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed,ref,watch } from "vue";
  export default {
    setup(){
      const store = useStore();

      const hasTitle = computed(function () {
        return store.getters.highChartsOptions.yAxis?.title?.text ?
          store.getters.highChartsOptions.yAxis.title.text :
          '';
      })
      const text = ref(hasTitle.value)
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.yAxis){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'yAxis',
          data: {}
        })
      }
      if(!highChartsOptions.value.yAxis.title){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'yAxis',
          second_key: 'title',
          data: {}
        })
      }
      if(!highChartsOptions.value.yAxis.title.text){
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'yAxis',
          second_key: 'title',
          third_key: 'text',
          data: ''
        })
      }

      watch(text, function (newValue) {
        store.dispatch('changePropertyWithThreeKeys', {
          first_key: 'yAxis',
          second_key: 'title',
          third_key: 'text',
          data: newValue
        })
      })


      return { text }
    }
  }
</script>