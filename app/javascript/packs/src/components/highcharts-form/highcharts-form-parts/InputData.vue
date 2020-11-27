<template>
  <p>Geben Sie hier ihre Chart Daten ein</p>
  <div v-if="isInvalid" class="alert alert-danger mt-3" role="alert">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </div>
  <div style="position:relative" id="table-wrapper">
  <div class="overflow-auto row" style="max-height: 500px">
    <div class="col-1">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>-</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-10">
      <table class="table table-bordered col-11" style="overflow-x: scroll; width: 10px">
        <thead>
        <input-data-column
          @send-data="applyColumnData"
          :inputColumns="inputColumns"
          :countColumns="countColumns"
          @add-columns="addColumns"
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
    </div>
  </div>
  </div>
  <button
    type="button"
    class="btn btn-outline-primary mt-3 float-right"
    @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import useLine from "../../../mixins/line";
  import { ref,reactive, watch, onMounted } from 'vue';
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
      let invalidRows = [];


      /************** Row Functions *******************/

      const inputRows = reactive({ data: [] });
      const countRows = ref(2);

      for(let i = 0; i < countRows.value; i++){
        inputRows.data[i] = [];
      }

      function addRows() {
        inputRows.data[countRows.value] = [];
        countRows.value += 1;
      }


      function applyRowData(payload) { inputRows.data = payload.data }

      /************** Columns Functions *******************/

      const inputColumns = reactive({ data: [] })
      const countColumns = ref(3);

      function addColumns() { countColumns.value += 1 }

      function applyColumnData(payload) { inputColumns.data = payload.data }

      /************** Validation *******************/

      function validate(){
        const element = document.activeElement;
        if(element.id.endsWith('1') || element.id.includes('0')){ return }

        if(!(/^(\d*[.])?\d+$/.test(element.value) &&
          element.value === '' &&
          invalidRows.includes(element.id)))
        {
          invalidRows.push(element.id);
        }
        if(invalidRows.includes(element.id) &&
          (/^(\d*[.])?\d+$/.test(element.value) ||
            element.value ===''))
        {
          invalidRows = invalidRows.filter(row => row !== element.id)
          element.style.backgroundColor = null;
          element.parentElement.style.backgroundColor = null;
        }
      }


      function setFormPart() {
        const list = document.getElementsByClassName('pseudo-class');
        for(let item of list) {
          if(item.value === '') {
            invalidRows.push(item.id);
          }
        }
        if(invalidRows.length > 0) {
          isInvalid.value = true
          for(let i = 0; i < invalidRows.length; i++) {
            let element = document.getElementById(invalidRows[i])
            element.style.backgroundColor = "#f8d7da"
            element.parentElement.style.backgroundColor = "#f8d7da"
          }
          invalidRows = []
        } else {
          store.dispatch('setFormPart', {
            data: 'InputAxes'
          })
        }
      }

      /************** Dispatch Values to Store (Chart Preview) *******************/


      watch([inputColumns, inputRows], function (newValues) {
        validate();
          dispatchLineChart(
            convertToXAxisOptions(newValues[1]),
            convertToSeriesOptions(countColumns, newValues[0], newValues[1])
          )
      })





    return {
      countColumns, countRows,isInvalid,
      addColumns, addRows,
      inputRows, inputColumns,
      applyRowData, applyColumnData,
      setFormPart
      }
  }
  }
</script>
