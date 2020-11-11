<template>
  <h2>{{ text }}</h2>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const text = ref('Hello World');
    return { text }
  }
}
</script>
