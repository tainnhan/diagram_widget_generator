<template>
  <the-navbar></the-navbar>
  <div id="container" class="container mt-5">
    <router-view></router-view>
  </div>
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
  }
}
</script>