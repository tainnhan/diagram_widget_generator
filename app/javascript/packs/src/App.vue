<template>
  <the-navbar></the-navbar>
  <div class="container mt-5">
      <component :is="isSelected"></component>
  </div>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar';
import FormPage from './components/FormPage';
import IndexPage from './components/IndexPage';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: {
    TheNavbar,
    FormPage,
    IndexPage
  },
  setup() {
    const store = useStore()
    const isSelected = computed(function () {
      return store.getters.page
    })


    return { isSelected }
  }
}
</script>