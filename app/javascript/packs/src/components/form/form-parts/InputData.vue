<template>
  <p>Geben Sie hier ihre Chart Daten ein</p>
  <div v-if="isInvalid" class="alert alert-danger mt-3" role="alert">
    Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
  </div>
  <div style="position:relative" id="table-wrapper">
    <div class="overflow-auto row" >
      <div class="col-1">
        <table id="data_delete_buttons" class="table table-borderless" style="margin-top:55px">
          <thead>
            <tr style="height: 45px">
              <th></th>
            </tr>
          </thead>
          <tbody v-if="countRows > 1">
            <tr style="height: 43px" v-for="(n, index) in countRows" :key="'row_button_'+ n">
              <th style="cursor: pointer" @click="destroyRow(index)"><i class="far fa-minus-square" ></i></th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-11">
        <table class="table table-borderless mb-0 table-responsive" style="width: auto">
          <thead>
            <tr>
              <th v-for="(n, index) in countColumns" :key="n">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th v-for="(n, index) in countColumns"  class="text-center"  :key="n">
                  <i v-if="n >2" class="far fa-minus-square" style="cursor: pointer; width: 81px" @click="destroyColumn(index)"></i>
                  <div v-else style="width: 81px"></div>
              </th>
            </tr>
          </tbody>
        </table>
        <!--  Data Table  -->
        <table class="table table-bordered" style="width: auto">
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
  <i
    id="help_tooltip"
    class="fas fa-question-circle mt-3"
    data-toggle="popover"
    data-container="body"
    data-placement="bottom"
    data-content="Sie können mithilfe der Pfeiltasten zwischen den verschienden Feldern wechseln oder gegebenfalls neue Zeilen oder Spalten erstellen."
    style="cursor: pointer"
  >
  </i>
</template>

<script>
  import useLine from "../../../mixins/line";
  import { ref,reactive, watch, onUpdated, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
  import InputDataColumn from './table/InputDataColumn';
  import InputDataRow from './table/InputDataRow';
  export default {
    components: {
      InputDataColumn,
      InputDataRow
    },
    setup() {
      const { convertToXAxisOptions, convertToSeriesOptions, dispatchLineChart } = useLine()
      const router = useRouter();
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

            if(element) {
              element.style.backgroundColor = "#f8d7da"
              element.parentElement.style.backgroundColor = "#f8d7da"
            }
          }

          invalidRows = []
        } else {
          router.push('/diagram/new/axis')
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



    let updateInvalidRow = false

      function destroyRow(index) {
        countRows.value -= 1;
        inputRows.data = inputRows.data.filter((item,i) => index !== i )
        updateInvalidRow = true
      }

      const showDeleteButton = ref(false)



      function destroyColumn(index) {
        countColumns.value -= 1;
        inputColumns.data[0] = ''
        inputColumns.data = inputColumns.data.filter((item,i) => index !== i)
        for(let i=0; i < inputRows.data.length; i++) {
          inputRows.data[i][0] = ''
          inputRows.data[i] = inputRows.data[i].filter((item, i) => index !== i)
        }
        updateInvalidRow = true
      }

      onUpdated(function () {
        if(updateInvalidRow) {
          invalidRows = invalidRows.filter(item => document.getElementById(item));
          updateInvalidRow = false
        }
      })

      onMounted(function () {
        const element = document.getElementById('help_tooltip')
        const popover = new bootstrap.Popover(element)
      })

    return {
      countColumns, countRows,isInvalid,
      addColumns, addRows,
      inputRows, inputColumns,
      applyRowData, applyColumnData,
      setFormPart, destroyRow,
      showDeleteButton,
      destroyColumn
      }
  }
  }
</script>
