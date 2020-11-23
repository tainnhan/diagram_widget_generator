<template>
  <p>Geben Sie hier ihre Chart Daten ein</p>
  <div style="position:relative" id="table-wrapper">
  <div class="overflow-auto" style="height:100%">
    <table style=" overflow-x: scroll">
      <thead>
      <input-data-column
        @send-data="applyColumnData"
        :inputColumns="inputColumns"
        :countColumns="countColumns"
      ></input-data-column>
      </thead>
      <input-data-row
        @add-columns="addColumns"
        @add-rows="addRows"
        @send-data="applyRowData"
        :inputRows="inputRows"
        :countColumns="countColumns"
        :countRows="countRows"
      ></input-data-row>
    </table>
    <div v-if="isInvalid" class="alert alert-danger mt-3" role="alert">
      Beim Eingabe der Daten sind nur Zahlen erlaubt. Bitte korrigieren Sie diese.
    </div>
  </div>
  </div>
</template>

<script>
  import useLine from "../../../mixins/line";
  import { ref,reactive, watch } from 'vue';
    import { useStore } from 'vuex'
  import InputDataColumn from './InputDataColumn';
  import InputDataRow from './InputDataRow';
  export default {
    components: {
      InputDataColumn,
      InputDataRow
    },
    setup() {
      const { convertToXAxisOptions, convertToSeriesOptions, dispatchLineChart } = useLine()
      const store = useStore();
      const isInvalid = ref(false)
      const countRows = ref(3);
      const countColumns = ref(3);
      let invalidRows = [];
      const inputRows = reactive({
        data: []
      });
      fillInputRows();

      function addRows() {
        inputRows.data[countRows.value] = [];
        countRows.value += 1;
      }

      function fillInputRows() {
        for(let i = 0; i < countRows.value; i++){
          inputRows.data[i] = [];
        }
      }

      function applyRowData(payload) {
        inputRows.data = payload.data;
      }


      const inputColumns = reactive({
        data: []
      })

      function addColumns() {
        countColumns.value += 1;
      }

      function applyColumnData(payload) {
        inputColumns.data = payload.data
      }

      function validate(newValue){
        isInvalid.value = false;
        for(let i = 0; i < invalidRows.length; i++) {
          document.getElementById(invalidRows[i]).classList.remove('is-invalid')
        }
        invalidRows = [];
        for(let i = 0; i < newValue.data.length; i++){
          for(let j=1;j < newValue.data[i].length; j++){
            if(!/^(\d*[.])?\d+$/.test(newValue.data[i][j]) && newValue.data[i][j]){
              invalidRows.push(`input_row_${i+1}_${j+1}`)
              if(!isInvalid.value ) {
                isInvalid.value = true;
              }
            }
          }
        }
        for(let i = 0; i < invalidRows.length; i++) {
          document.getElementById(invalidRows[i]).classList.add('is-invalid')
        }
      }

      watch([inputColumns, inputRows], function (newValues) {
        validate(newValues[1]);
        if (invalidRows.length === 0) {
          dispatchLineChart(
            convertToXAxisOptions(newValues[1]),
            convertToSeriesOptions(countColumns, newValues[0], newValues[1])
          )
        }
      })


    return {
      countColumns, countRows,isInvalid,
      addColumns, addRows,
      inputRows, inputColumns,
      applyRowData, applyColumnData,
      }
  }
  }
</script>