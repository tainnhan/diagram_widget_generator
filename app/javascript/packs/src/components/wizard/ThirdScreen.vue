<template>
  <div class="card-body">
    <div class="text-center">
      <div>
        <h3 class="mt-3"><strong>Dateneingabe</strong></h3>
        <p>Hier können Sie ihre Daten eingeben. Mit den Pfeiltasten <span class="bg-light"> &#8592;&#8593; &#8594; &#8595; </span> können sie innerhalb der Felder neue Spalten oder Zeilen erstellen.</p>
        <input-data @submit-data="setFunction" @submit-boolean="setBoolean"></input-data>
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
  import DataTable from "../form/DataTable";
  import InputData from "../form/form-parts/InputData";
  import { computed } from "vue";
  import {useRoute, useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  export default {
    components: {
      InputData,
      DataTable
    },
    emits:['changeScreen'],
    setup(props, { emit }){
      let submitData;
      let canSaved = true;
      const router = useRouter();
      const route = useRoute();
      const store = useStore();

      // Callbcak Funktion aus DataInput.vue -> Valididerung der Felder
      function setFunction(submitDataFunction) {
        submitData = submitDataFunction;
      }

      //Die Callback Funktion emitted einen Boolean Wert ob die Felder valide sind oder nicht
      function setBoolean(data) {
          canSaved = data;
      }

      function previousScreen(){
        emit('changeScreen', 'second-screen');
      }

      const formData = computed(function () {
        return store.getters.highChartsOptions;
      })

      async function nextScreen() {
          if(submitData){
            submitData()
          }
          if(canSaved){
              if(route.params.id){
                await store.dispatch('putChart', { id: route.params.id, data: formData.value });
              } else {
                await store.dispatch('submitForm', { data: formData.value, fromImport: false });
              }
              await router.push(store.getters.pathName);
          }
        }

      return { nextScreen,setFunction, setBoolean, previousScreen}
    }

  }
</script>