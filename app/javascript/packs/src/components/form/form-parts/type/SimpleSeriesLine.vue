<!--
 Eine vereinfachte Form von Optionen für die Serie von Type Line. Diese enthält nicht alle Optionen, deswegen der Namen
 Space 'Simpel'. Alle Optionen sind abhängig von der Serie deswegen muss die Serie hier mit übergeben werden
-->

<template>
  <line-color :selected="selected"></line-color>
  <line-dash-style :selected="selected"></line-dash-style>
  <line-marker-symbol :selected="selected"></line-marker-symbol>
  <enabled-markers></enabled-markers>

</template>

<script>
  import lineColor from "../../options/series/line/LineColor";
  import lineDashStyle from "../../options/series/line/LineDashStyle";
  import enabledMarkers from "../../options/plotOptions/series/marker/EnabledMarkers";
  import LineMarkerSymbol from "../../options/series/line/marker/LineMarkerSymbol";

  import { computed } from 'vue';
  export default {
    components: {
      lineColor,
      lineDashStyle,
      LineMarkerSymbol,
      enabledMarkers,
    },
    props: {
      series: {
        type: Object,
        required: true
      },
      selected: {
        type: Number,
        required: true
      }
    },
    setup(props){
      const series = computed(function () { return props.series })
      const selected = computed(function () { return props.selected })

      // DashStyle Line Options



      return {  series,selected }
    }
  }
</script>