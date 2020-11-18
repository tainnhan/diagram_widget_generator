<template>
  <tr>
    <th v-for="(_, index) in countColumns" :key="'column_' + index">
      <input style="width:100px" class="form-control m-0" type="text" v-model="columns.data[index]"/>
    </th>
  </tr>
</template>

<script>
  import { reactive } from 'vue';
  export default {
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
    setup(props){

    const columns = reactive(props.inputColumns)
      return { columns }
    },
  }
</script>

<style scoped>
  th {
    width: 50px;
  }

</style>