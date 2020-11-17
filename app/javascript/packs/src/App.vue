<template>
  <the-navbar></the-navbar>
  <div class="container">
    <button v-if="isSelected === 'IndexPage'" class="btn btn-primary" @click="selectPage">Neues Diagramm erstellen</button>
    <component :is="isSelected" class="mt-5"></component>
  </div>
  <the-footer></the-footer>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar';
import TheFooter from './components/layout/TheFooter';
import FormPage from './components/FormPage';
import IndexPage from './components/IndexPage';

import { ref } from 'vue';
export default {
  components: {
    TheNavbar,
    TheFooter,
    FormPage,
    IndexPage
  },
  setup() {
    const isSelected = ref('FormPage');
    const showButton = ref(true);

    function selectPage() {
      isSelected.value = isSelected.value === 'IndexPage' ? 'FormPage' : 'IndexPage';
      showButton.value = !showButton.value;
    }

    return { isSelected, selectPage }
  }
}
</script>
