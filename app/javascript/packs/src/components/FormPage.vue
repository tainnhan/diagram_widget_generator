<template>
  <the-navbar :container="isBeginner ? 'container' : 'container-fluid'" ></the-navbar>

  <div v-if="chartIsLoaded">
    <wizard-page v-if="isBeginner" ></wizard-page>
    <editor-page v-else></editor-page>
  </div>
</template>

<script>
import WizardPage from "./pages/WizardPage";
import EditorPage from "./pages/EditorPage";
import TheNavbar from "./layout/TheNavbar";
import { useStore } from 'vuex';
import {ref, computed, onMounted } from "vue";
export default {
  components: {
    WizardPage,
    EditorPage,
    TheNavbar
  },
  props: ['id'],
  setup(props){
    const store = useStore();
    const isBeginner = computed(function () {
      return store.getters.isBeginner;
    })
    const chartIsLoaded = ref(false);
    async function loadChart() {
      if(props.id){
        await store.dispatch('fetchChart', {id: props.id});
      }
      chartIsLoaded.value = true;
    }
    loadChart();


    return { isBeginner, chartIsLoaded }
  }
}

</script>