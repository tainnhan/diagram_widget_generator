<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="captions_text" class="form-label mt-2">Bildunterschrift Text</label>

    </div>
    <div class="col-8">
      <textarea id="captions_text" class="form-control" v-model="text"/>
    </div>
  </div>

</template>

<script>
  import { computed, ref, watch } from "vue";
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasCaptionText = computed(function () {
        return store.getters.highChartsOptions.caption?.text ?
        store.getters.highChartsOptions.caption.text :
          ''
      })
      const text = ref(hasCaptionText.value);
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