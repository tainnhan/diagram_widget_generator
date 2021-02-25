<template>
  <toast-message toastIdName="csv_toast_error" @send-toast="setToast">
    Ihre CSV-Datei ist nicht valid! Bitte schauen Sie ob die Anzahl der Werte pro Zeile überall gleich sind.
  </toast-message>
  <div style="position: relative">
    <div class="overflow-auto row">
      <div class="col-1">
        <table id="data_delete_buttons" class="table table-borderless" style="margin-top:55px">
          <thead>
          <tr style="height: 45px">
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr style="height: 43px" v-for="n in numbersOfRows - 1" :key="'row_button_'+ n">
            <th v-if="n > 1" style="cursor: pointer" @click="destroyRow(n)"><i class="far fa-minus-square" ></i></th>
            <th v-else></th>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-11">
        <table class="table table-borderless mb-0 table-responsive" style="width: auto">
          <thead>
          <tr>
            <th v-for="n in numberOfColumns" :key="n" :style="[ numberOfColumns < 3 ? { height: '40px' } : '' ]">
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th v-for="(n, index) in numberOfColumns"  class="text-center"  :key="n">
              <i v-if="n > 2" class="far fa-minus-square" style="cursor: pointer; width: 81px" @click="destroyColumn(index)"></i>
              <div v-else style="width: 81px"></div>
            </th>
          </tr>
          </tbody>
        </table>

        <!---Hier werden die Daten richtigen Daten eingegeben  -->
        <table class="table table-bordered" style="width: auto">
          <thead>
            <tr>
              <th class="bg-light" v-for="(m,index) in numberOfColumns">
                <input
                  :id="'input_row_0_'+index"
                  :key="'input_row_0_'+index"
                  class="m-0 border-0 bg-light"
                  type="text"
                  style="max-width: 80px;"
                  v-model="dataArray.data[0][index]"
                  @keyup="changeInputFocus($event, 0, index)"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(n) in numbersOfRows - 1">
              <th v-for="(m, index_2) in numberOfColumns" :class="thClass(m)">
                <input
                  :id="'input_row_' + n + '_' + index_2"
                  style="max-width: 80px"
                  class="m-0 border-0 input_field"
                  :class="inputClass(m)"
                  type="text"
                  v-model="dataArray.data[n][index_2]"
                  @keyup="changeInputFocus($event, n,index_2)"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="float-left">
  <input @change="importCsv($event)" type="file" class="csv-input float-right" id="csv-input" accept="text/csv">
  <label class=" mt-3 btn btn-outline-primary" style="cursor:pointer" for="csv-input">Import CSV</label>
  </div>
</template>

<script>
  import { reactive, ref, onUpdated, watch } from 'vue';
  import ToastMessage from "../UI/ToastMessage";

  export default {
    emits: ['getData'],
    props: {
      data: {
        type: Array,
        required: false,
        default: []
      },
      rows: {
        type: Number,
        required: true
      },
      columns: {
        type: Number,
        required: true
      }
    },
    components: {
      ToastMessage
    },
    setup(props, {emit } ){
      const numbersOfRows = ref(props.rows);
      const numberOfColumns = ref(props.columns);
      const dataArray = reactive({data: createDataArray()})
      let inputId = ''
      let csvValid = true;
      let toast;



      function addRows() {
        dataArray.data[numbersOfRows.value] = Array.apply(null, Array(numberOfColumns.value)).map(function () { return '' });
        numbersOfRows.value += 1;
      }

      function addColumns() {
        for(let i = 0; i < numbersOfRows.value; i++) {
          dataArray.data[i].push('')
        }
        numberOfColumns.value += 1
      }

      function destroyRow(n){
        numbersOfRows.value -= 1;
        dataArray.data = dataArray.data.filter((item,i) => n !== i)
      }

      function destroyColumn(index) {

        for(let i = 0; i < dataArray.data.length; i++) {
         dataArray.data[i] =  dataArray.data[i].filter((item,i) => i !== index)
        }

        numberOfColumns.value -= 1;
      }



    function changeInputFocus(event, n, m) {
      if(event.key === "ArrowLeft") {
        changeFocus(`input_row_${n}_${m-1}`,event)
      }
      if(event.key === "ArrowUp"){
        changeFocus(`input_row_${n-1}_${m}`,event)
      }
      if(event.key === "ArrowRight"){
       if(!changeFocus(`input_row_${n}_${m+1}`, event)){
         addColumns()
         inputId = `input_row_${n}_${m+1}`
       }
      }
      if(event.key === "ArrowDown") {
        if(!changeFocus(`input_row_${n+1}_${m}`, event)){
          addRows()
          inputId = `input_row_${n+1}_${m}`
        }
      }
    }

      onUpdated(function () {
          if(inputId !== '') {
            document.getElementById(inputId).focus();
            inputId = ''
          }
      })

      function inputClass (m) { return m === 1 ? 'bg-light' : 'check-value' }
      function thClass(m) { return m === 1 ? 'bg-light' : '' }

      function createDataArray() {
        let array = props.data;
        if(array.length === 0) {
          for (let i = 0; i < numbersOfRows.value; i++) {
            array.push(Array.apply(null, Array(numberOfColumns.value)).map(function () {
              return ''
            }));

          }
        }
        return array;
      }

    watch(dataArray, function (newValue) {
        emit('getData', {
          data:newValue,
          csvValid: csvValid
        });
        if(csvValid === false) {
          csvValid = true;
        }
    })

    function changeFocus(inputId,event) {
        let element = document.getElementById(inputId);
        if (element){
          if(event.target.value.length === event.target.selectionEnd || event.target.selectionEnd === 0) {
            element.selectionStart = 0;
            element.selectionEnd = element.value.length;
            element.focus()
          }
          return true;
        }
        else {
          return false;
        }

    }

      /************************************************************************************/
      // 1. CSV File Import und Handling für unsere Datentabelle
      // 2. Beim Importieren eines CSV wird, wird diese in Arrays von Arrays geparsed/umgewandelt
      // 3. Validierung des CSV File (Auf Zahlenwerte, Anzahl Spalten bzw. Anzahl Werte jeder Zeile müssen gleich sein)
      // 2. Fehlermeldung wenn CSV Struktur falsch

        function importCsv(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = loaded;
          reader.onerror = errorHandler
          event.target.value = '';
        }

        function loaded(event) {
          const result = event.target.result.trim();
          let csvArray = transformCsv(result)

          if(valuesAreNumbers(csvArray)){
            createRowsColumnsFromCsv(csvArray)
            dataArray.data = csvArray;
          } else{
            createRowsColumnsFromCsv(csvArray)
            csvValid = false;
            dataArray.data = csvArray;
          }

        }

        function valuesAreNumbers(csvArray){
          let removeHeaderArray = csvArray.filter((item, index) => index !== 0);
          for(let i = 0; i < removeHeaderArray.length; i++ ){
            removeHeaderArray[i] = removeHeaderArray[i].filter( (item, index) => index !== 0);
          }
          const data = removeHeaderArray.flat()

          //if every value in an array is a number return true
          return !data.some(isNaN);
        }


        function transformCsv(csvString){
          const result = csvString.slice()
          let csvArray = [];
          result.replace(',',';');
          const splitArray = result.split(/\r?\n|\r/);
          splitArray.forEach(function (item) {
            let subArray = item.split(";");
            csvArray.push(subArray);
          })
          // 1. Zeilen haben verschiedene Anzahl an Werten
          let array = [];
          csvArray.forEach(item => array.push(item.length));
          if (array.every((val,i, arr) => val === arr[0])){
            return csvArray
          } else {
            // Füge leere Werte an jeder Zeile damit die Anzahl an Werten pro Zeile gleich ist
            const highest = Math.max(...array)
            const copy = [];
            for(let i = 0; i < csvArray.length ; i++) {
              copy[i] = csvArray[i];
              if (copy[i].length < highest) {
                let difference = highest - copy[i].length
                copy[i].push(...Array(difference).fill(''))
              }
            }
            return copy
          }
        }

        function createRowsColumnsFromCsv(csvArray){
          if(numbersOfRows.value < csvArray.length) {
            for (let i = numbersOfRows.value; i < csvArray.length; i++) {
              addRows();
            }
          } else {
            for (let i = numbersOfRows.value; i > csvArray.length; i--) {
              destroyRow(i)
            }
          }
          if(numberOfColumns.value < csvArray[0].length ) {
            for(let i = numberOfColumns.value; i < csvArray[0].length; i++) {
              addColumns()
            }
          } else {
            for(let i = numberOfColumns.value; i > csvArray[0].length; i--) {
              destroyColumn(i)
            }
          }
        }

        function errorHandler(event) {
          if(event.target.error.name === 'NotReadableError'){
            console.log('Syntax ist falsch');
          }

      }

      function setToast(payload) {
        toast = payload;
      }
      /************************************************************************************/

    return {
        setToast,
      numberOfColumns, numbersOfRows,
      dataArray, inputClass,
      changeInputFocus, thClass,
      destroyRow, destroyColumn,
      importCsv
      }
    }
  }
</script>

<style scoped>
  input:focus {
    outline: none;
  }
   .csv-input {
     width: 0.1px;
     height: 0.1px;
     opacity: 0;
     overflow: hidden;
     position: absolute;
     z-index: -1;
   }
</style>


