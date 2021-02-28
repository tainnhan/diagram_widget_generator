<template>
  <toast-message toastIdName="toast_data_input" @send-toast="setToast">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </toast-message>
  <nav class="navbar navbar-light bg-light">
    <chart-type-editor></chart-type-editor>
    <div class="clearfix mr-2">
      <button class="btn btn-outline-primary float-right" @click="submit">Speichern</button>
    </div>
  </nav>
</template>
<script>
  import ChartTypeEditor from "../highcharts/options/chart/ChartTypeEditor";
  import { useStore } from 'vuex';
  import {useRoute, useRouter} from 'vue-router';
  import ToastMessage from "../UI/ToastMessage";
  import checkData from "../../mixins/checkData";
  import {computed} from "vue";
  export default {
    components: {
      ChartTypeEditor,
      ToastMessage
    },
    setup(props, { emit }){
      const router = useRouter();
      const route = useRoute();
      const store = useStore();
      const { submitData } = checkData();

      let toast;

      function setToast(payload) {
        toast = payload;
      }

      const formData = computed(function () {
        return store.getters.highChartsOptions;
      })


     async function submit() {
        await store.dispatch('setTab', 'data-tab');
        const list = store.getters.dataList;
        submitData(list, store, toast,false);
        const isValid = store.getters.dataIsValid;
         if(isValid) {
           if (route.params.id) {
             await store.dispatch('putChart', {id: route.params.id, data: formData.value});
           } else {
             await store.dispatch('submitForm', {data: formData.value});
           }
           await router.push(store.getters.pathName);
         }
         }
      return {submit, setToast}
    }
  }
</script>