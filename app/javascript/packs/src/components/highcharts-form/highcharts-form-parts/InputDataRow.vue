<template>
  <tbody>
    <tr v-for="(n, index) in countRows" >
      <th v-for="(m, index_2) in countColumns">
        <input
          @keyup="changeInputFocus($event, n, m)"
          :id="'input_row_'+ n + '_' + m"
          style="width:100px"
          class="form-control m-0"
          type="text"
          v-model="rows.data[index][index_2]"
        />
      </th>
    </tr>
  </tbody>
</template>

<script>
import { ref, reactive, watch, onUpdated } from 'vue';
  export default {
    emits: ['send-data','add-rows', 'add-columns'],
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

      watch(rows, function (newValue, oldValue) {
          emit('send-data', newValue);
      });

      function changeInputFocus(event,n,m){
        if(event.keyCode === 37){
          let element = document.getElementById(`input_row_${n}_${m-1}`)
          if(element){
            element.focus()
          }
        }
        if(event.keyCode === 38){
          let element = document.getElementById(`input_row_${n-1}_${m}`)
          if(element){
            element.focus()
          }
        }
        if(event.keyCode === 39){
          let element = document.getElementById(`input_row_${n}_${m+1}`)
          inputId = `input_row_${n}_${m+1}`
          if(element){
            element.focus()
          } else {
            emit('add-columns');
            updated = true
          }
        }
        if(event.keyCode === 40){
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

      return { rows, changeInputFocus };
    }
  }
</script>
