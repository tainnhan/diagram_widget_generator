<template>
  <tbody>
    <tr v-for="(n, index) in countRows" >
      <th v-for="(m, index_2) in countColumns" :class="inputClass(m)">
        <input
          @keyup="changeInputFocus($event, n, m)"
          :id="'input_row_'+ n + '_' + m"
          style="max-width: 80px"
          class="m-0 border-0"
          :class="inputClass(m)"
          type="text"
          v-model="rows.data[index][index_2]"
          :key="'input_row_'+ n + '_' + m"
        />
      </th>
    </tr>
  </tbody>
</template>

<script>
import { reactive, watch, onUpdated } from 'vue';
  export default {
    emits: ['send-data','add-rows', 'add-columns', 'on-blur'],
    props: {
      countColumns: {
        type: Number,
        required: true
      },
      countRows: {
        type: Number,
        required: true
      },
      inputRows: {
        type: Object,
        required: true
      }
    },
    setup(props , { emit }){
      const rows = reactive(props.inputRows);
      let updated = false;
      let inputId = '';

      function inputClass (m) {
        if(m===1){
           return "bg-light"
        } else {
          return "pseudo-class"
        }
      }

      watch(rows, function (newValue) {
          emit('send-data', newValue);
      });

      function changeInputFocus(event,n,m){
        if(event.key === "ArrowLeft"){
          let element = document.getElementById(`input_row_${n}_${m-1}`)
          if(element){
            element.focus()
          }
        }
        if(event.key === "ArrowUp"){
          let element = document.getElementById(`input_row_${n-1}_${m}`)
          if(element){
            element.focus()
          }
        }
        if(event.key === "ArrowRight"){
          let element = document.getElementById(`input_row_${n}_${m+1}`)
          inputId = `input_row_${n}_${m+1}`
          if(element){
            element.focus()
          } else {
            emit('add-columns');
            updated = true
          }
        }
        if(event.key === "ArrowDown"){
          let element = document.getElementById(`input_row_${n+1}_${m}`)
          inputId = `input_row_${n+1}_${m}`
          if(element){
            element.focus();
          } else {
            emit('add-rows');
            updated = true
          }
        }
      }

      onUpdated(function () {
        if(updated){
          document.getElementById(inputId).focus();
          updated = false;
        }
      })


      return { rows, changeInputFocus, inputClass};
    }
  }
</script>
<style scoped>
  input:focus {
    outline: none;
  }
</style>
