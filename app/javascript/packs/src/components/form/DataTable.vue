<template>
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
  <i
    id="help_tooltip"
    class="fas fa-question-circle mt-3 ml-5"
    data-toggle="popover"
    data-container="body"
    data-placement="bottom"
    data-content="Sie können mithilfe der Pfeiltasten zwischen den verschienden Feldern wechseln oder gegebenfalls neue Zeilen oder Spalten erstellen."
    style="cursor: pointer"
  >
  </i>
</template>

<script>
  import { reactive, ref, onUpdated, watch } from 'vue';

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
    setup(props, {emit } ){
      const numbersOfRows = ref(props.rows);
      const numberOfColumns = ref(props.columns);
      const dataArray = reactive({data: createDataArray()})
      let inputId = ''


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



    let changeFocus = false;
    function changeInputFocus(event, n, m) {
      if(event.key === "ArrowLeft") {
        let element = document.getElementById(`input_row_${n}_${m-1}`)

        if(element && event.target.selectionStart === 0 ) {
          element.focus()
        }
      }
      if(event.key === "ArrowUp"){
        changeFocus = false;
        let element = document.getElementById(`input_row_${n-1}_${m}`)
        if(element) {
          element.focus()
        }
      }
      if(event.key === "ArrowRight"){
        let element = document.getElementById(`input_row_${n}_${m+1}`)
        let focus = event.target.selectionStart === event.target.value.length
        if(focus) { changeFocus = true }
        if(element && focus ) {
          element.focus()
        } else if(focus){
          addColumns()
          inputId = `input_row_${n}_${m+1}`

        }
      }
      if(event.key === "ArrowDown") {
        changeFocus = false
        let element = document.getElementById(`input_row_${n+1}_${m}`)
        if(element) {
          element.focus()
        } else {
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
      emit('getData', newValue);
    })


    return {
      numberOfColumns, numbersOfRows,
      dataArray, inputClass,
      changeInputFocus, thClass,
      destroyRow, destroyColumn
      }
    }
  }
</script>

<style scoped>
  input:focus {
    outline: none;
  }
</style>


