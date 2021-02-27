<template>
  <toast-message toastIdName="toast_data_input" @send-toast="setToast">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </toast-message>
  <data-table @get-data="setData" :data="startingData" :rows="rows" :columns="columns" @destroy-series="executeDestroySeries"></data-table>
</template>

<script>
  import {reactive, watch, computed,ref } from 'vue';
  import arrayToCsvConverter from "../../../mixins/arrayToCsv";
  import ToastMessage from "../../UI/ToastMessage";
  import dataTable from "../DataTable";
  import { useStore } from 'vuex';

  export default {
    components: {
      dataTable, ToastMessage
    },
    emits: ['submitData','submitBoolean'],
    setup(props, { emit}) {
      const tableData = reactive({ data: [] })
      const { headerToCsv, arrayToCsv, csvToArray } = arrayToCsvConverter()
      const store = useStore();
      let invalidRows = [];
      const rows = ref(10);
      const columns = ref(5);
      const startingData = ref([])
      let toast;
      let csvValid = ref(true);


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
        csvValid.value = payload.csvValid;
      }


      /************************************************************************************/
       // 1. Wird ausgeführt wenn Daten sich ändern
      // 1. Wandelt unsere Arrays von Daten in ein CSV Format
      // 2. Übergibt diese an den Highcharts Object, wenn Validation erfolgreich ist

        watch(tableData, function (newValue) {
          invalidRows = [];
          let csv = headerToCsv(newValue.data[0]) + arrayToCsv(newValue.data.filter((item,i) => i !== 0 ))
          validate()
          if(invalidRows.length === 0 && csvValid) {
            store.dispatch('changePropertyWithOneKey', {
               first_key: 'data',
               data: {
               csv: csv
               }
             })
            console.log(store.getters.highChartsOptions);
            if(destroySeries){
              store.dispatch('removeSeries', index );
              destroySeries = false;
            }
            emit('submitData', submitData);
            }
          })



      /************************************************************************************/
      // 1. Wird ausgeführt wenn der User auf 'Weiter' klickt
      // 2. Checkt ob Felder leer gelassen wurden sind, oder diese keine Nummern sind
      // 3. Push diese in unser Invalid Inputs Arrays
      // 4. Alle Inputs die in Invalid Array sind, werden rot gefärbt und es erscheint eine Fehlermeldung

      function submitData() {
        const list = document.getElementsByClassName('check-value');
        for(let item of list) {
          if(item.value === '' || isNaN(item.value)) {
            invalidRows.push(item.id);
          }
        }
        if(invalidRows.length > 0) {
          for (let row of invalidRows) {
            const element = document.getElementById(row);
            element.style.backgroundColor = "#f8d7da"
            element.parentElement.style.backgroundColor = "#f8d7da"
            toast.show()
          }
          emit('submitBoolean', false);
        } else {
          store.dispatch('setFormPart', {
            data: chooseComponent.value
          })
          emit('submitBoolean', true);
        }
      }




      /******************************************f******************************************/
      // 1. Checkt ob die Eingebenenen Werte Zahlen sind
      // 2. Fügt die Inputs die Invalid sind in ein Array
      // 3. Die Inputs die valide sind, werden zurückgefärbt bzw. bleiben wie gehabt

      function validate() {
        const list = document.getElementsByClassName('check-value');
        for (let item of list) {
          if (!/^(\d*[.])?\d+$/.test(item.value) && item.value !== '') {
            invalidRows.push(item.id);
          } else if(/^(\d*[.])?\d+$/.test(item.value)){
            const element = document.getElementById(item.id);
            element.style.backgroundColor = null
            element.parentElement.style.backgroundColor = null
          }
        }
      }

      const chooseComponent = computed(function () {
        if(store.getters.highChartsOptions.chart.type === 'pie') {
          return 'InputTooltip'
        } else {
          return 'InputAxes'
        }
      })


      function setToast(data){
        toast = data;
      }

      return { setData, submitData, setToast, startingData, rows , columns, executeDestroySeries}

  }
  }
</script>
