<template>
  <div class="card mt-3">
    <div class="card-header">
      {{ options.title ? options.title.text : '' }}
    </div>
    <div class="card-body" style="">
      <highcharts :options="options"></highcharts>
    </div>
    <div class="card-footer">
      <!--
      <button
        data-toggle="tooltip"
        data-placement="bottom"
        title="Bearbeiten"
        class="btn btn-outline-success"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="btn btn-outline-danger"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Löschen"
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
      -->
    </div>
  </div>
</template>
<script>
  import { reactive } from 'vue';
  export default {
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    setup(props) {

    }
  }
</script>