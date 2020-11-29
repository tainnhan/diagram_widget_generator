<template>
    <title-options></title-options>
    <subtitle-options></subtitle-options>
    <chart-options></chart-options>
    <router-link
        class="btn btn-outline-primary mt-3 float-right"
        to="/diagram/new/data"
    >Weiter</router-link>
    <!--
    <input type="range"  v-model.number="chartSize.width" class="form-range" min="50" max="3000">
    <input type="range"  v-model.number="chartSize.height" class="form-range" min="50" max="3000">
      --->
</template>

<script>
  import titleOptions from "../options/TitleOptions";
  import subtitleOptions from "../options/SubtitleOptions";
  import chartOptions from "../options/chartOptions";

  export default {
    components: {
      titleOptions,
      subtitleOptions,
      chartOptions
    }
  }
</script>