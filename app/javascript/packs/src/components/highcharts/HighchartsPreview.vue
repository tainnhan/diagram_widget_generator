<template>
<div class="card">
  <div class="card-body">
    <highcharts :options="options"></highcharts>
  </div>
</div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const options = reactive(store.getters.highChartsOptions)
    return { options }
  }
}

</script>