<template>
  <div class="card-body">
    <div class="mx-5 text-center">
      <h3 class="mt-2"><strong>Titel des Diagramms</strong></h3>
      <p>Bitte geben Sie hier den Titel des Diagramms ein. Dieser Titel stellt wesentliche Informationen zum Diagramm dar.</p>
      <div class="mt-3">
        <title-text @send-title="setTitle" :is-wizard="true"></title-text>
      </div>
    </div>
  </div>
  <div class="card-footer overflow-auto">
    <button
            :disabled="isDisabled"
            class="btn btn-primary float-right"
            @click="nextScreen">Weiter
    </button>
  </div>
</template>

<script>
  import TitleText from "../highcharts/options/title/TitleText";
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  export default {
    components: {
      TitleText
    },
    emits:['changeScreen'],
    setup(props, { emit }){
      const store = useStore();
      const title = ref('');
      const isDisabled = ref(!store.getters.highChartsOptions.title);
      function setTitle(data){
        title.value = data;
        isDisabled.value = data === '';
      }

      function nextScreen() {
        emit('changeScreen', 'second-screen');
      }
      return { nextScreen, setTitle, isDisabled }
    }
  }
</script>

<style scoped>
  #title_label {
    display: none;
  }
</style>

