<template>
  <div class="text-center">
    <highcharts :options="options"></highcharts>
</div>
</template>

<script>
import { computed } from 'vue';
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