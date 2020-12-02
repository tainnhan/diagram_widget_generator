<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent>
        <component :is="selectedComponent"></component>
      </form>
    </div>
  </div>
</template>
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'
  import InputGeneral from "./form-parts/InputGeneral";
  import InputSeries from "./form-parts/InputSeries";
  import InputData from "./form-parts/InputData";
  import InputAxes from "./form-parts/InputAxes";
  import InputLegend from "./form-parts/InputLegend";
  import InputTooltip from "./form-parts/InputTooltip";
  import InputCredits from "./form-parts/InputCredits";

  export default {
    components: {
      InputCredits, InputTooltip, InputLegend, InputAxes, InputData, InputSeries, InputGeneral
    },
    setup() {
      const store = useStore();
      const selectedComponent = computed(function () { return store.getters.formPart })
      return {
        selectedComponent,
      }
    }
  }

</script>