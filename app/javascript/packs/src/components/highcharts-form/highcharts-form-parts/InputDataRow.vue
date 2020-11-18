<template>
  <tbody>
    <tr v-for="(_, index) in countRows" >
      <th v-for="(_, index_2) in countColumns">
        <input style="width:100px" class="form-control m-0" type="text" v-model="rows.data[index][index_2]"/>
      </th>
    </tr>
  </tbody>
</template>

<script>
import { reactive, watch } from 'vue';
  export default {
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
    setup(props){
      const rows = reactive(props.inputRows);

      watch(rows, function () {
          // hier wird das an die HighJS option chart übergeben
      })



      return { rows };
    }
  }
</script>
