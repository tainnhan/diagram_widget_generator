<template>
  <highchart-preview></highchart-preview>
</template>

<script>
  import HighchartPreview from "../highcharts/HighchartPreview";
  import {useStore} from 'vuex';
  export default {
    components: { HighchartPreview },
    props: ['id'],
    setup(props){
      const store = useStore()
      store.dispatch('fetchChart', { id: props.id })
    }
  }
</script>