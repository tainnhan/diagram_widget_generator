<template>
  <div class="text-center my-auto">
    <highcharts :options="options" ></highcharts>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    urlData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const store = useStore();

    const options = computed(function () {
      return props.urlData ? props.urlData : store.getters.highChartsOptions;
    })

    return { options }
  }
}

</script>