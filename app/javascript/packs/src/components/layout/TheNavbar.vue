<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link :to="pathname">
        <img src="../../../../../assets/images/diagram_widget_generator/logo.png" alt="Logo für die Bachelorarbeit"
                              width="75" height="75">
      </router-link>
      <button class="btn btn-primary" @click="changeUser">{{ user }}</button>
    </div>
  </nav>
</template>
<script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    setup(){
      const store = useStore();
      const pathname = store.getters.pathName;
      const router = useRouter();
      const user = computed(function () {
        return store.getters.isBeginner ? 'Anfänger' : 'Fortgeschrittene';
      })
      function changeUser() {
        let r;
        if(pathname !== window.location.pathname ){
          r = confirm("Befinden Sie sich grad im Bearbeitungsmodus so wird dieser beendet und Änderungen gehen verloren. Sind Sie sicher dass sie fortfahren wollen ?");
          if(r){
            store.dispatch('setUser');
            store.dispatch('resetForm');
            router.push(pathname);
          }
        } else {
          store.dispatch('setUser');
        }
      }
      return { pathname,changeUser, user }

    }
  }
</script>