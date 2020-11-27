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
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';
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

    onMounted(function () {
      let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
      tooltipTriggerList.map(function (tooltipTriggerEl) {
       return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    })

    return { isSelected }
  }
}
</script>