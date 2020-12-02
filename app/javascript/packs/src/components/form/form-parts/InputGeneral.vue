<template>
  <title-text></title-text>
  <title-align></title-align>
  <title-vertical-align></title-vertical-align>
  <subtitle-text></subtitle-text>
  <subtitle-align></subtitle-align>
  <subtitle-vertical-align></subtitle-vertical-align>
  <chart-type></chart-type>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import titleText from "../options/title/TitleText";
  import titleAlign from "../options/title/TitleAlign";
  import titleVerticalAlign from "../options/title/TitleVerticalAlign";
  import subtitleText from "../options/subtitle/SubtitleText";
  import subtitleAlign from "../options/subtitle/SubtitleAlign";
  import subtitleVerticalAlign from "../options/subtitle/SubtitleVerticalAlign";
  import chartType from "../options/chart/ChartType";
  import dataTable from "../DataTable";
  import { useStore } from 'vuex';


  export default {
    components: {
      titleText, titleAlign, titleVerticalAlign,
      subtitleText,subtitleAlign, subtitleVerticalAlign,
      chartType,  dataTable
    },
    setup(){
      const store = useStore();

      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputData'
        })
      }
      console.log(window.location.origin);

      return { setFormPart }
    }
  }
</script>