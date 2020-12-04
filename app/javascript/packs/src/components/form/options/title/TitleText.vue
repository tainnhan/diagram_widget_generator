<template>
  <div class="mb-3">
    <label for="title" class="form-label">Titel</label>
    <input id="title" class="form-control" type="text" v-model="title"/>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasTitle = computed(function () {
        return store.getters.highChartsOptions.title?.text ? store.getters.highChartsOptions.title.text : ''
      })
      const title = ref(hasTitle.value);
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.title) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'title',
          data: {}
        })
      }

      if(!highChartsOptions.value.title.text) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'text',
          data: ''
        })
      }

      watch(title, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'text',
          data: newValue
        })
      })


      return { title }
    }
  }
</script>