<template>
  <tr>
    <th v-for="(_, index) in countColumns" :key="'column_' + index">
      <input
        style="width:100px"
        class="form-control m-0"
        type="text"
        v-model="columns.data[index]"
      />
    </th>
  </tr>
</template>

<script>
  import { reactive, watch } from 'vue';
  export default {
    emits: ['send-data'],
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
      watch(columns, function (newValue) {
        emit('send-data', newValue);
      })

      return { columns }
    },
  }
</script>

<style scoped>
  th {
    width: 50px;
  }

</style>