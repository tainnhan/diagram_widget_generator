<template>
  <div class="text-center my-auto">
    <highcharts :options="options"></highcharts>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const options = computed(function () {
      return store.getters.highChartsOptions;
    })
    return { options }
  }
}
</script>