<template>
  <column-color-by-point></column-color-by-point>
  <column-color :selected="selected"></column-color>
</template>

<script>
  import { computed } from 'vue';
  import ColumnColor from "../../options/series/column/ColumnColor";
  import ColumnColorByPoint from "../../options/plotOptions/column/ColumnColorByPoint";
  export default {
    components: {
      ColumnColor,
      ColumnColorByPoint
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