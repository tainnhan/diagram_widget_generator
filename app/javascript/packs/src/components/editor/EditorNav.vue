<template>
  <nav class="navbar navbar-light bg-light">
    <chart-type-editor></chart-type-editor>
    <div class="clearfix mr-2">
      <button class="btn btn-outline-primary float-right">Speichern</button>
    </div>
  </nav>
</template>
<script>
  import ChartTypeEditor from "../form/options/chart/ChartTypeEditor";
  export default {
    components: {
      ChartTypeEditor
    }
  }
</script>