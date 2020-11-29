<template>

  <div class="dropdown float-right">
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
      <!--
      <li class="dropdown-item" style="cursor: pointer">Import(JSON)</li>
      -->
    </ul>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    setup(){
      const store = useStore();
      const router = useRouter();
      function selectPage() {
        store.dispatch('resetForm');
        store.dispatch('setFormPart',{
          data: 'InputGeneral'
          })
        router.push('/diagram/new')
      }
      return { selectPage }
    }
  }
</script>

