<template>
  <div class="mb-3">
    <label for="subtitle" class="form-label">Subtitel</label>
    <input id="subtitle" class="form-control" type="text" v-model="subtitle.text"/>
  </div>
  <div class="row">
    <div class="mb-3 col-md-6">
      <label for="subtitle_align">Ausrichtung Subtitel</label>
      <select id="subtitle_align" class="form-select" v-model="subtitle.alignSelected" >
        <option v-for="align in subtitleConfiguration.align" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
    <div class="mb-3 col-md-6">
      <label for="vertical_subtitle_align">Vertikale Ausrichtung Subtitel</label>
      <select id="vertical_subtitle_align" class="form-select" v-model="subtitle.verticalAlignSelected">
        <option v-for="align in subtitleConfiguration.verticalAlign" :value="align.value" :key="align.text">{{align.text}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { reactive, watch } from "vue";

  export default {
    setup(){
      const store = useStore();
      const subtitleConfiguration = store.getters.subtitleConfiguration;
      const subtitle = reactive({
        text: '',
        alignSelected: 'center',
        verticalAlignSelected: 'top'
      })

      watch(subtitle, function (newValue) {
        store.dispatch('changeChartsProperties', {
            property: 'subtitle',
            data: {
              text: newValue.text,
              align: newValue.alignSelected,
              verticalAlign: newValue.verticalAlignSelected
            }
          }
        )
      })

      return { subtitle, subtitleConfiguration }
    }
  }
</script>