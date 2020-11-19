<template>
  <form @submit.prevent>
    <section>
      <div class="mb-3">
        <label for="title" class="form-label">Titel</label>
        <input id="title" class="form-control" type="text" v-model="titleConfig.text"/>
      </div>
      <div class="row">
        <div class="mb-3 col-6">
          <label for="title_align">Ausrichtung Titel</label>
          <select id="title_align" class="form-select" v-model="titleConfig.alignSelected">
            <option v-for="align in titleConfig.align" :value="align.value" :key="align.text">{{align.text}}</option>
          </select>
        </div>
        <div class="mb-3 col-6">
          <label for="vertical_title_align">Vertikale Ausrichtung Titel</label>
          <select id="vertical_title_align" class="form-select" v-model="titleConfig.verticalAlignSelected">
            <option v-for="align in titleConfig.verticalAlign" :value="align.value" :key="align.text">{{align.text}}</option>
          </select>
        </div>
      </div>
    </section>

    <section>
      <div class="mb-3">
        <label for="subtitle" class="form-label">Subtitel</label>
        <input id="subtitle" class="form-control" type="text" v-model="subtitleConfig.text"/>
      </div>
      <div class="row">
        <div class="mb-3 col-6">
          <label for="subtitle_align">Ausrichtung Subtitel</label>
          <select id="subtitle_align" class="form-select" v-model="subtitleConfig.alignSelected" >
            <option v-for="align in subtitleConfig.align" :value="align.value" :key="align.text">{{align.text}}</option>
          </select>
        </div>
        <div class="mb-3 col-6">
          <label for="vertical_subtitle_align">Vertikale Ausrichtung Subtitel</label>
          <select id="vertical_subtitle_align" class="form-select" v-model="subtitleConfig.verticalAlignSelected">
            <option v-for="align in subtitleConfig.verticalAlign" :value="align.value" :key="align.text">{{align.text}}</option>
          </select>
        </div>
      </div>
    </section>
    <section>
      <div >
        <label for="chart_type">Chart</label>
        <select id="chart_type" class="form-select" v-model="chartType.text">
          <option v-for="chart in chartType.type" :value="chart.value" :key="chart.text">{{chart.text}}</option>
        </select>
      </div>
    </section>
    <input type="range"  v-model.number="chartSize.width" class="form-range" min="50" max="3000">
    <input type="range"  v-model.number="chartSize.height" class="form-range" min="50" max="3000">

  </form>
</template>

<script>
  import { reactive, watch } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore();
      const titleSubtitleConfig = store.getters.titleSubtitle;
      const chartSize = reactive({
        width: 50,
        height: 50,
      })

      function titleSubtitlePayload(data) {
        return {
          property: data.property,
          data: {
            text: data.text,
            align: data.alignSelected === '' ? 'center' : data.alignSelected,
            verticalAlign: data.verticalAlignSelected === '' ? undefined : data.verticalAlignSelected
          }
        }
      }

      const titleConfig = reactive({ property: 'title', ...titleSubtitleConfig});
      watch(titleConfig, function () {
        store.dispatch(
          'changeChartsProperties',
            titleSubtitlePayload(titleConfig)
          )
      })


      const subtitleConfig = reactive({ property: 'subtitle',...titleSubtitleConfig});
      watch(subtitleConfig, function () {
        store.dispatch(
          'changeChartsProperties',
          titleSubtitlePayload(subtitleConfig)
        )
      })

      const chartType = reactive({...store.getters.chartTypes});
      watch([chartType, chartSize], function () {
        store.dispatch(
          'changeChartsProperties',
          {
            property: chartType.property, data: {
              type: chartType.text,
              width: chartSize.width,
              height: chartSize.height
            }
          }
        )
      })


      return {
        titleConfig,
        subtitleConfig,
        chartType,
        chartSize
      }
    }
  }
</script>