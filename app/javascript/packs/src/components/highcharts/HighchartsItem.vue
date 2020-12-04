<template>
  <div class="card mt-3">
    <div class="card-header">
      {{ options.title ? options.title.text : '' }}
    </div>
    <div class="card-body" style="">
      <highcharts :options="options"></highcharts>
    </div>
    <div class="card-footer">
      <button
        data-toggle="tooltip"
        data-placement="bottom"
        title="Bearbeiten"
        class="btn btn-outline-success"
        @click="editChart(chartId)"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="btn btn-outline-danger"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Löschen"
        @click="deleteChart"
      >
        <i class="fas fa-trash"></i>
      </button>
      <div class="float-right">
        <button
          class="btn btn-outline-primary"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Show Iframe HTML Code (was man in andere Seiten einbetten kann)"
        >
          <i class="fas fa-link"></i>
        </button>
        <button
          class="btn btn-outline-primary"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Chart downloaden (JSON)"
        >
          <i class="fas fa-download"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import { useRouter } from 'vue-router';
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  export default {
    props: {
      options: {
        type: Object,
        required: true
      },
      chartId: {
        type: Number,
        required: true
      }
    },
    setup(props) {

      const store = useStore();
      const router = useRouter();

      function deleteChart() {
        const result = confirm("Wollen Sie diese Chart wirklich löschen ?")
        if (result ) {
          store.dispatch('deleteChart', {
            id: props.chartId
          })
        }
      }

       function editChart(id){
         store.dispatch('editChart', {
          id: id
        })
         store.dispatch('setFormPart',{
           data: 'InputGeneral'
         })
        router.push('/diagram/edit/' + id)
      }

      return { deleteChart, editChart }
    }
  }
</script>