<template>
  <the-navbar></the-navbar>
  <div class="container-fluid">
    <button v-if="isSelected === 'IndexPage'" class="btn btn-primary" @click="selectPage">Neues Diagramm erstellen</button>
    <component :is="isSelected"></component>
  </div>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar';
import FormPage from './components/FormPage';
import IndexPage from './components/IndexPage';

import {onMounted, ref} from 'vue';
export default {
  components: {
    TheNavbar,
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
