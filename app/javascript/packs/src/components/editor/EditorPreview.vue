<template>
  <div class="d-flex align-items-center justify-content-center" style="height:800px">

    <div class="card" style="width:700px" >
      <div class="card-body">
        <highchart-preview></highchart-preview>

      </div>
    </div>
  </div>

</template>

<script>
  import HighchartPreview from "../highcharts/HighchartPreview";
  import {computed } from 'vue';
  export default {
    components:{
      HighchartPreview
    },
    setup(){
     const windowHeight =  computed(function () {
        return 'height:' + window.innerHeight + 'px';
     });

      return {windowHeight}
    }
  }
</script>