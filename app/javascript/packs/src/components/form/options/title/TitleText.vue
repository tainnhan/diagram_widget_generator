<template>
  <div class="mb-4 row">
    <div class="col-4 text-right">
      <label for="title" class="form-label mt-2" id="title_label">Text</label>
    </div>
    <div class="col-8">
      <input id="title" class="form-control" type="text" placeholder="Das ist mein Titel...." v-model="title"/>
    </div>
  </div>
</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    props: {
      isWizard: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    emits: ['sendTitle'],
    setup(props, { emit }) {
      const store = useStore();

      const highChartsOptions = computed(function () {
        return store.getters.highChartsOptions
      })

      // edit
      const hasTitle = computed(function () {
        return highChartsOptions.value.title?.text ? highChartsOptions.value.title.text : ''
      })

      const title = ref(hasTitle.value);


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
        if(props.isWizard) {
          emit('sendTitle', newValue)
        }
      })


      return { title,highChartsOptions }
    }
  }
</script>