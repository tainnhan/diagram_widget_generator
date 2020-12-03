<template>
  <area-color :selected="selected"></area-color>
  <area-dash-style :selected="selected"></area-dash-style>
  <enabled-markers></enabled-markers>
  <area-marker-symbol :selected="selected"></area-marker-symbol>

</template>

<script>
  import AreaColor from "../../options/series/area/AreaColor";
  import AreaDashStyle from "../../options/series/area/AreaDashStyle";
  import EnabledMarkers from "../../options/plotOptions/series/marker/EnabledMarkers";
  import AreaMarkerSymbol from "../../options/series/area/marker/AreaMarkerSymbol";
  import { computed } from "vue";
  export default {
    components: {
      AreaColor,
      AreaDashStyle,
      EnabledMarkers,
      AreaMarkerSymbol
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
      const selected = computed(function () { return props.selected })

      return { selected }
    }
  }
</script>