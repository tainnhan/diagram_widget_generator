<template>
  <the-navbar></the-navbar>
    <router-view></router-view>
</template>
<script>
import TheNavbar from './components/layout/TheNavbar';
import FormPage from './components/FormPage';
import IndexPage from './components/IndexPage';
import { useStore } from 'vuex'
export default {
  components: {
    TheNavbar,
    FormPage,
    IndexPage
  },
  setup(){
    const store = useStore();
    store.dispatch('setPathName');
    if(localStorage.getItem('user')){
      const isBeginner = localStorage.getItem('user') === 'true';
      //sollte man ändern bisschen bad practice, state so aufzurufen
      store.state.isBeginner = isBeginner;
    }
  }
}
</script>