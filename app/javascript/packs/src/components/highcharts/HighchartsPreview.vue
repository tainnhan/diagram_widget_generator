<template>
<div class="mt-5">
  <div class="text-center">
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