<template>
  <h2>{{ text }}</h2>
  <button class="btn btn-danger">Button</button>
  <div style="width: 400px; height: 200px;">
    <Highcharts :options="stockOptions"></Highcharts>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  setup() {
    const text = ref('Hello World');
    const stockOptions = reactive({
      series: [{
        data: [1,2,3] // sample data
      }]
    })
    return { text, stockOptions }
  }
}
</script>
