<template>
  <toast-message toastIdName="toast_data_input" @send-toast="setToast">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </toast-message>
  <div class="card-body">
    <div class="text-center">
      <div>
        <h3 class="mt-3"><strong>Dateneingabe</strong></h3>
        <p>Hier können Sie ihre Daten eingeben. Mit den Pfeiltasten <span class="bg-light"> &#8592;&#8593; &#8594; &#8595; </span> können sie innerhalb der Felder neue Spalten oder Zeilen erstellen.</p>
        <input-data></input-data>
      </div>
    </div>
  </div>
  <div class="card-footer overflow-auto">
    <button
            class="btn btn-primary float-left"
            @click="previousScreen"
    > Zurück</button>
    <button
            class="btn btn-primary float-right"
            @click="nextScreen">Speichern
    </button>
  </div>
</template>

<script>
  import DataTable from "../table/DataTable";
  import InputData from "../table/InputData";
  import checkData from "../../mixins/checkData";
  import ToastMessage from "../UI/ToastMessage";
  import { computed } from "vue";
  import {useRoute, useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  export default {
    components: {
      InputData,
      DataTable,
      ToastMessage
    },
    emits:['changeScreen'],
    setup(props, { emit }){
      let toast;
      const router = useRouter();
      const route = useRoute();
      const store = useStore();
      const { submitData } = checkData();

      function setToast(payload) {
        toast = payload;
      }


      function previousScreen(){
        emit('changeScreen', 'second-screen');
      }


      const formData = computed(function () {
        return store.getters.highChartsOptions;
      })

      async function nextScreen() {
        const list = store.getters.dataList;
        submitData(list, store, toast);
        const isValid = store.getters.dataIsValid;
        if(isValid){
          if(route.params.id){
            await store.dispatch('putChart', { id: route.params.id, data: formData.value });
          } else {
            await store.dispatch('submitForm', { data: formData.value });
          }
          await router.push(store.getters.pathName);
        }
      }
      return { nextScreen,  previousScreen, setToast}
    }

  }
</script>