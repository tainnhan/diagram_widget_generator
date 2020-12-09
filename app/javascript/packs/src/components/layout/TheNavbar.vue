<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link :to="pathname">
        <img src="../../../../../assets/images/diagram_widget_generator/logo.png" alt="Logo für die Bachelorarbeit"
                              width="75" height="75">
      </router-link>
    </div>
  </nav>
</template>
<script>
  import { useStore } from 'vuex';
  export default {
    setup(){
      const store = useStore();
      const pathname = store.getters.pathName;
      return { pathname }
    }
  }
</script>