<template>
  <tr>
    <th class="bg-light" v-for="(_, index) in countColumns" :key="'column_' + index">
      <input
        :id="'input_row_0' + '_' + `${index+1}`"
        class="m-0 border-0 bg-light"
        style="max-width:80px"
        @keyup="changeInputFocus($event, index)"
        type="text"
        v-model="columns.data[index]"
      />
    </th>
  </tr>
</template>

<script>
  import { reactive, watch, onUpdated } from 'vue';
  export default {
    emits: ['send-data', 'add-columns'],
    props: {
      countColumns: {
        type: Number,
        required: true
      },
      inputColumns: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }){
      const columns = reactive(props.inputColumns);
      let inputId = '';
      let updated = false
      watch(columns, function (newValue) {
        emit('send-data', newValue);
      })

      function changeInputFocus(event, index) {

        if(event.key ==="ArrowDown") {
          inputId = `input_row_1_${index+1}`
          document.getElementById(inputId).focus()
        }
        if(event.key ==="ArrowRight") {
          inputId = `input_row_0_${index+2}`;
          console.log(inputId)
          const element = document.getElementById(inputId)
          if(element) {
            element.focus()
          } else {
            emit('add-columns')
            updated = true
          }
        }
        if(event.key === "ArrowLeft") {
          inputId = `input_row_0_${index}`;
         const  element = document.getElementById(inputId);
         if(element){
           element.focus()
         }
        }
      }

      onUpdated(function () {
        if(updated){
          document.getElementById(inputId).focus();
          updated = false;
        }
      })
      return { columns, changeInputFocus }
    },
  }
</script>

<style scoped>
  input:focus {
    outline: none;
  }


</style>