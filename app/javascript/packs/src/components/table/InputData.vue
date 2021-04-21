<template>
  <data-table @get-data="setData" :data="startingData" :rows="rows" :columns="columns" @destroy-series="executeDestroySeries"></data-table>
</template>

<script>
  import {reactive, watch, computed,ref, onMounted } from 'vue';
  import arrayToCsvConverter from "../../mixins/arrayToCsv";
  import ToastMessage from "../UI/ToastMessage";
  import dataTable from "../form/DataTable";
  import { useStore } from 'vuex';

  export default {
    components: {
      dataTable, ToastMessage
    },
    setup() {
      const tableData = reactive({ data: [] })
      const { headerToCsv, arrayToCsv, csvToArray } = arrayToCsvConverter()
      const store = useStore();
      const rows = ref(10);
      const columns = ref(5);
      const startingData = ref([])


      let destroySeries = false;
      let index;
      function executeDestroySeries(data) {
        destroySeries = true;
        index = data;
      }


      /************************************************************************************/
      // 1. Ausgeführt wenn ein vorhander Chart bearbeitet wird
      // 2. Die Daten des vorhanden Chart befüllt unsere ansonsten leere Startdaten
      // 3. Die Props werden automatisch dann in DataTable geupdatet

        const csvData = store.getters.highChartsOptions.data?.csv;
        if(csvData) {
          startingData.value = csvToArray(csvData)
          rows.value = startingData.value.length;
          columns.value = startingData.value[0].length
        }


      /************************************************************************************/
      // 1. Die Daten kommen aus unserer DataTable.vue Komponente
      // 2. Über Emits wird unsere Tabelle gefüllt

      function setData(payload) {
        tableData.data = payload.data.data;
      }


      /************************************************************************************/
       // 1. Wird ausgeführt wenn Daten sich ändern
      // 1. Wandelt unsere Arrays von Daten in ein CSV Format

        watch(tableData, function (newValue) {
          let csv = headerToCsv(newValue.data[0]) + arrayToCsv(newValue.data.filter((item,i) => i !== 0 ))
          store.dispatch('changePropertyWithOneKey', {
              first_key: 'data',
              data: {
                csv: csv
              }
            })

          // wird ausgeführt wenn ein Column entfernt wird
          if(destroySeries){
              store.dispatch('removeSeries', index );
              destroySeries = false;
          }
          })

      return { setData, startingData, rows , columns, executeDestroySeries}

  }
  }
</script>
