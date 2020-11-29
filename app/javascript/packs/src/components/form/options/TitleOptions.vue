<template>
  <div class="mb-3">
    <label for="title" class="form-label">Titel</label>
    <input id="title" class="form-control" type="text" v-model="title.text"/>
  </div>
  <div class="row">
    <div class="mb-3 col-6">
      <label for="title_align">Ausrichtung Titel</label>
      <select id="title_align" class="form-select" v-model="title.alignSelected">
        <option v-for="align in titleConfiguration.align" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
    <div class="mb-3 col-6">
      <label for="vertical_title_align">Vertikale Ausrichtung Titel</label>
      <select id="vertical_title_align" class="form-select" v-model="title.verticalAlignSelected">
        <option v-for="align in titleConfiguration.verticalAlign" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import { reactive, watch } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();
      const titleConfiguration = store.getters.titleConfiguration;
      const title = reactive({
        text: '',
        alignSelected: 'center',
        verticalAlignSelected: 'top'
      })

      watch(title, function (newValue) {
        store.dispatch('changeChartsProperties', {
            property: 'title',
            data: {
              text: newValue.text,
              align: newValue.alignSelected,
              verticalAlign: newValue.verticalAlignSelected
            }
          }
        )
      })

      return { titleConfiguration, title }
    }
  }
</script>