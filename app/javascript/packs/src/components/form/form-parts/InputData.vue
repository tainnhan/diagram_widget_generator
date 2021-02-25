<template>
  <toast-message toastIdName="toast_data_input" @send-toast="setToast">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </toast-message>
  <!-------
  <div class="row">
    <div class="col-11">
      <p class="text-left">Geben Sie hier ihre Chart Daten ein</p>
    </div>
    <div class="col-1 text-right">
      <i
        id="help_tooltip"
        class="fas fa-question-circle "
        data-toggle="popover"
        data-container="body"
        data-placement="bottom"
        data-content="Sie können mithilfe der Pfeiltasten zwischen den verschienden Feldern wechseln oder gegebenfalls neue Zeilen oder Spalten erstellen."
        style="cursor: pointer"
      >
      </i>
    </div>
  </div>
  ------>
  <data-table @get-data="setData" :data="startingData" :rows="rows" :columns="columns"></data-table>
  <!----
    <div class="float-right">
    <button
          type="button"
          class="btn btn-outline-primary mt-3"
          @click="submitData"
  >Werte auf Richtigkeit checken</button>
  </div>
  --->
</template>

<script>
  import {reactive, watch, computed,ref } from 'vue';
  import arrayToCsvConverter from "../../../mixins/arrayToCsv";
  import ToastMessage from "../../UI/ToastMessage";
  import dataTable from "../DataTable";
  import { useStore } from 'vuex';
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

  export default {
    components: {
      dataTable, ToastMessage
    },
    emits: ['submitData','submitBoolean'],
    setup(props, { emit}) {
      const tableData = reactive({ data: [] })
      const { headerToCsv, arrayToCsv, csvToArray } = arrayToCsvConverter()
      const store = useStore();
      let series = [];
      let invalidRows = [];
      const rows = ref(4);
      const columns = ref(2);
      const startingData = ref([['','Serie'],['Europa', 10.2], ['America',9.8], ['Afrika', 30.2]])
      let toast;
      let csvValid = ref(true);


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
          for(let i = 1; i < newValue.data[0].length; i++){

            // In der Form [[x,y],[x,y], [x,y]] -> HighChart Api unter series/chart/data
             series.push({ name: newValue.data[0][i] === '' ? "null" : newValue.data[0][i] })
          }
          validate()
          if(invalidRows.length === 0 && csvValid) {
            store.dispatch('changePropertyWithOneKey', {
              first_key: 'series',
              data: series
            })
             store.dispatch('changePropertyWithOneKey', {
               first_key: 'data',
               data: {
               csv: csv
               }
             })
            emit('submitData', submitData);
            }
           series = [];
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




      /************************************************************************************/
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


      /*
      let popover;
      onMounted(function () {
        const tooltipElement = document.getElementById('help_tooltip');
         popover = new bootstrap.Popover(tooltipElement)
      })
      onUnmounted(function () {
        popover.hide();
      })
       */
      return { setData, submitData, setToast, startingData, rows , columns }

  }
  }
</script>
