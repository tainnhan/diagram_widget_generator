<template>
  <!-- Kann man seperat in eine komponente bauen -->
  <teleport to="body">
  <div style="position: absolute; top: 10px; right: 10px">
    <div id="toast" class="toast bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Fehlermeldung</strong>
        <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Die Rot markieren Felder dürfen nicht leer gelassen werden und nur Zahlen sind zugelassen. Bitte korregieren Sie diese.
      </div>
    </div>
  </div>
  </teleport>
  <p>Geben Sie hier ihre Chart Daten ein</p>
  <data-table @get-data="setData"></data-table>
  <button
    type="button"
    class="btn btn-outline-primary mt-3 float-right"
    @click="submitData"
  >Weiter</button>
</template>

<script>
  import { reactive, watch, onMounted } from 'vue';
  import arrayToCsvConverter from "../../../mixins/arrayToCsv";
  import { useRouter } from 'vue-router';
  import dataTable from "../DataTable";
  import { useStore } from 'vuex';
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

  export default {
    components: {
      dataTable
    },
    setup() {
      const tableData = reactive({ data: [] })
      const router = useRouter();
      const { headerToCsv, arrayToCsv } = arrayToCsvConverter()
      const store = useStore();
      let series = [];
      let invalidRows = [];
      let toast;
      function setData(data) {
        tableData.data = data.data;
      }


    watch(tableData, function (newValue) {
      invalidRows = [];
      let csv = headerToCsv(newValue.data[0]) + arrayToCsv(newValue.data.filter((item,i) => i !== 0 ))
      for(let i = 1; i < newValue.data[0].length; i++){
         series.push({ name: newValue.data[0][i] === '' ? "null" : newValue.data[0][i] })
      }
      validate()
      if(invalidRows.length === 0) {
         store.dispatch('changeChartsProperties', {
           property: 'series',
           data: series
         })
         store.dispatch('changeChartsProperties', {
           property: 'data',
           data: {
           csv: csv
           }
         })
        }
       series = [];
      })

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

      function submitData() {
        const list = document.getElementsByClassName('check-value');
        for(let item of list) {
          if(item.value === '') {
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
        } else {
          store.dispatch('setFormPart', {
            data: 'InputAxes'
          })
        }
      }

      onMounted(function () {
        let element = document.getElementById('toast');
        toast =  new bootstrap.Toast(element)
      })
      return { setData, submitData }

  }
  }
</script>
