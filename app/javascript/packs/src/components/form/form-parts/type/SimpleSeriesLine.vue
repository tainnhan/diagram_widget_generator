<!--
 Eine vereinfachte Form von Optionen für die Serie von Type Line. Diese enthält nicht alle Optionen, deswegen der Namen
 Space 'Simpel'. Alle Optionen sind abhängig von der Serie deswegen muss die Serie hier mit übergeben werden
-->

<template>
  <line-color :color="color" :selected="selected"></line-color>
  <line-dash-style :dash-style="dashStyle" :selected="selected"></line-dash-style>
  <line-marker :series="series" :selected="selected"></line-marker>
  <enabled-markers></enabled-markers>

</template>

<script>
  import lineColor from "../../options/series/line/LineColor";
  import lineDashStyle from "../../options/series/line/LineDashStyle";
  import lineMarkerSymbol from "../../options/series/line/marker/LineMarkerSymbol";
  import lineMarker from "../../options/series/line/LineMarker";
  import enabledMarkers from "../../options/plotOptions/series/marker/EnabledMarkers";

  import { computed } from 'vue';
  import { useStore } from 'vuex';
  export default {
    components: {
      lineColor,
      lineDashStyle,
      lineMarkerSymbol,
      lineMarker,
      enabledMarkers
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
      const store = useStore();
      const series = computed(function () { return props.series })
      const selected = computed(function () { return props.selected })

      // Color Line Options
      const color = computed(function () {
        return series.value.color ? series.value.color : store.getters.seriesConfiguration.defaultColors[selected.value % 10]
      })

      // DashStyle Line Options
      const dashStyle = computed(function () { return series.value.dashStyle ? series.value.dashStyle : 'Solid' })



      return { color, dashStyle, series }
    }
  }
</script>