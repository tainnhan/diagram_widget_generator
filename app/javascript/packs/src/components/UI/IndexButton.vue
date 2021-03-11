<template>
  <div class="clearfix">
    <button @click="selectPage" class="btn btn-outline-primary float-right">Diagramm erstellen</button>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    setup(){
      const store = useStore();
      const router = useRouter();
      const pathname = store.getters.pathName;
      function selectPage() {
        store.dispatch('resetForm');
        router.push(pathname+ '/charts/new');
      }


      return { selectPage }

    }
  }
</script>
