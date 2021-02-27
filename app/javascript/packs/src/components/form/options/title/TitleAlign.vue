<template>
  <div class="mb-3 row">
    <div class="col-4 text-right">
      <label for="title_align" class="mt-2">Ausrichtung</label>
    </div>
    <div class="col-8">
      <select id="title_align" class="form-select" v-model="alignSelected">
        <option v-for="align in alignOptions" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
  </div>



  <div class="mb-4 row">
    <div class="col-4 text-right">

    </div>
    <div class="col-8">

    </div>
  </div>

</template>
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const hasAlign = computed(function () {
        return store.getters.highChartsOptions.title?.align ? store.getters.highChartsOptions.title.align : 'center'
      })
      const alignSelected = ref(hasAlign.value);
      const alignOptions = computed(function(){ return store.getters.titleConfiguration.align })
      const highChartsOptions = computed(function () { return store.getters.highChartsOptions })

      if(!highChartsOptions.value.title) {
        store.dispatch('changePropertyWithOneKey', {
          first_key: 'title',
          data: {}
        })
      }

      if(!highChartsOptions.value.title.align) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'align',
          data: 'center'
        })
      }

      watch(alignSelected, function (newValue) {
        store.dispatch('changePropertyWithTwoKeys', {
          first_key: 'title',
          second_key: 'align',
          data: newValue
        })
      })


      return { alignSelected, alignOptions }
    }
  }
</script>