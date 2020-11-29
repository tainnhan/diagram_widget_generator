<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <router-view></router-view>
        <button v-if="selectedComponent === 'InputCredits'"
          type="submit"
          class="btn btn-outline-primary mt-3 float-right"
        >Speichern</button>
      </form>
    </div>
  </div>
</template>
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'

  export default {

    setup() {
      const store = useStore();
      const router = useRouter();
      const selectedComponent = computed(function () {
        return store.getters.formPart
      })

      const formData = computed(function () {
        return store.getters.highChartsOptions;
      })

      function submitForm() {
        store.dispatch('submitForm', {
          data: formData.value
        });
        router.push('/diagram');
      }

      return {
        selectedComponent,
        submitForm
      }
    }
  }

</script>