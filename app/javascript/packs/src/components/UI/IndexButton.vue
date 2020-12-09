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
      <li class="dropdown-item">
        <input @change="uploaded($event)" type="file" id="file" accept="application/json">
        <label style="width: 100%; cursor:pointer" for="file">Import(JSON)</label>
      </li>
    </ul>
  </div>
</template>

<script>
  import { onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    setup(){
      const store = useStore();
      const router = useRouter();
      const pathname = store.getters.pathName;
      function selectPage() {
        store.dispatch('resetForm');
        store.dispatch('setFormPart',{
          data: 'InputGeneral'
          })
        router.push(pathname+ '/new');
      }

      function uploaded(event){
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsText(file);


        reader.onload = loaded;
        reader.onerror = errorHandler
      }
      
      function loaded(event) {
        const string = event.target.result;
        try {
          JSON.parse(string);
          console.log(string);
        } catch (e) {
          console.log("konnte nicht geparsed werden")
          return false;
        }
        const decodedJsonString = encodeURIComponent(string)
        router.push({path: store.getters.pathName + '/json-preview', query: {json: decodedJsonString}})
      }
      
      function errorHandler(event) {
        if(event.target.error.name === 'NotReadableError'){
          console.log('Syntax ist falsch');
        }
      }

      return { selectPage,uploaded }

    }
  }
</script>

<style scoped>
#file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
