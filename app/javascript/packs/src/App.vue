<template>
  <the-navbar></the-navbar>
  <div class="container mt-5">
    <!-- Das werde ich später noch in einen seperaten Component reinballern und in IndexPage-->
    <div class="dropdown float-right" v-if="isSelected === 'IndexPage'">
      <button
        id="create_highCharts_dropdown"
        class="btn btn-outline-primary dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        Neues Diagramm erstellen
      </button>
      <ul class="dropdown-menu" aria-labelledby="create_highCharts_dropdown">
        <li class="dropdown-item" style="cursor: pointer" @click="selectPage">Diagramm manuell erstellen</li>
        <li class="dropdown-item" style="cursor: pointer">Import(JSON)</li>
      </ul>
    </div>
    <!-- -->
      <component :is="isSelected"></component>
  </div>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar';
import FormPage from './components/FormPage';
import IndexPage from './components/IndexPage';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { useStore } from 'vuex';
import { onMounted, computed, reactive, ref } from 'vue';
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
     function selectPage() {
       store.dispatch('setPage', {
        data: 'FormPage'
      })
    }

    onMounted(function () {
      let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
      tooltipTriggerList.map(function (tooltipTriggerEl) {
       return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    })

    return { isSelected, selectPage }
  }
}
</script>