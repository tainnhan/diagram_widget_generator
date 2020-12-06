<template>
  <div class="card">
    <div class="card-body">
      <highcharts-preview :url-data="options.option"></highcharts-preview>
    </div>
    <div class="card-footer">
      <button class="btn btn-outline-primary float-right" @click="submitChart">Speichern</button>
    </div>
  </div>
</template>
<script>
  import TheNavbar from './layout/TheNavbar';
  import { reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import {useRoute, useRouter} from 'vue-router';
  import HighchartsPreview from "./highcharts/HighchartsPreview";
  export default {
    components: {
      TheNavbar,
      HighchartsPreview
    },
    setup(){
      const route = useRoute();
      const router = useRouter();
      const store = useStore()
      const options = reactive({
        option: {}
      })
      const json = route.query.json;
      const object = decodeURIComponent(json)
      try {
        options.option = JSON.parse(object);
      } catch (e) {
        console.log("JSON query konnte nicht geparsed werden. umgeleitet zu hauptseite")
        router.push(store.getters.pathName)
      }

      function submitChart(){
        store.dispatch('submitForm', {
          data: options.option,
          fromImport: true
        })
      }

      return {options, submitChart }
    }
  }
</script>