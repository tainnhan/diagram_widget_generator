<template>
  <h2>Geben Sie hier ihre Chart Daten ein</h2>
  <div style="position:relative">
  <div class="overflow-auto" style="height:100%">
    <table style=" overflow-x: scroll">
      <thead>
      <input-data-column :inputColumns="inputColumns" :countColumns="countColumns"></input-data-column>
      </thead>
      <input-data-row  :inputRows="inputRows" :countColumns="countColumns" :countRows="countRows"></input-data-row>
    </table>
  </div>
  </div>
  <button class="btn btn-primary" @click="addRows">Zeile hinzufügen</button>
  <button class="btn btn-primary" @click="addColumns">Spalte hinzufügen</button>
</template>

<script>
  import { ref,reactive  } from 'vue';
  import InputDataColumn from './InputDataColumn';
  import InputDataRow from './InputDataRow';
  export default {
    components: {
      InputDataColumn,
      InputDataRow
    },
    setup() {
      const countRows = ref(2);
      const countColumns = ref(2);
      const inputRows = reactive({
        data: []
      });
      const inputColumns = reactive({
        data: []
      })


      fillInputRows();

    function addRows() {
      countRows.value += 1;
      fillInputRows();
    }
    function addColumns() {
      countColumns.value += 1;
    }

    function fillInputRows() {
      for(let i = 0; i < countRows.value; i++){
        inputRows.data[i] = [];
      }
    }

    //mounted => leere inputRows und inPutData => Ich gebe daten ein => emits zu Parent => countRows +1 => inputRows.data[countRows.value] = []
    return  { countColumns, countRows, addColumns, addRows, inputRows, inputColumns }
  }
  }
</script>