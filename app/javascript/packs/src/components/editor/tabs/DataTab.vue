<template>
  <p class="mt-5">Hier können Sie ihre Daten eingeben. Mit den Pfeiltasten <span class="bg-light"> &#8592;&#8593; &#8594; &#8595; </span> können sie innerhalb der Felder neue Spalten oder Zeilen erstellen.</p>
  <input-data></input-data>
</template>

<script>
  import InputData from "../../table/InputData";
  export default {
  components: {
    InputData
    }
  }
</script>