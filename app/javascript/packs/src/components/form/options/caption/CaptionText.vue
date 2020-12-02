<template>
  <div class="mb-3">
    <label for="captions_text" class="form-label">Bildunterschrift Text</label>
    <textarea id="captions_text" class="form-control" v-model="text"/>
  </div>
</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const text = ref('');
      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      if(!highChartsOptions.value.caption){
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'caption',
          data: {}
        })
      }

      if(!highChartsOptions.value.caption.text){
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'caption',
          second_key: 'text',
          data: ''
        })
      }

      watch(text, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'caption',
          second_key: 'text',
          data: newValue
        })
      })

      return { text }
    }
  }

</script>