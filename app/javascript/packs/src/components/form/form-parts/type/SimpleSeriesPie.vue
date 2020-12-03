<template>
  <pie-color :selected="selected"></pie-color>
</template>

<script>
  import PieColor from "../../options/series/pie/PieColor";
  import { computed } from 'vue';
  export default {
    components: {
      PieColor
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