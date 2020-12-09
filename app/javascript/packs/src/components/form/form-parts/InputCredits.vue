<template>
    <credits-enabled></credits-enabled>
    <credits-text></credits-text>
    <credits-link></credits-link>
    <caption-text></caption-text>
    <button
        type="submit"
        class="btn btn-outline-primary mt-3 float-right"
        @click="submitForm"
    >Speichern</button>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router'
  import {computed, reactive, watch} from 'vue';
  import creditsEnabled from "../options/credits/CreditsEnabled";
  import creditsText from "../options/credits/CreditsText";
  import creditsLink from "../options/credits/CreditsLink";
  import captionText from "../options/caption/CaptionText";
  export default {
    components: {
      creditsEnabled, creditsText, creditsLink, captionText
    },
      setup(){
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const formData = computed(function () {
             return store.getters.highChartsOptions;
        })
        const pathname = store.getters.pathName;
         async function submitForm() {
            if(route.params.id) {
              await store.dispatch('putChart', { data: formData.value, id: route.params.id })
            } else {
              await store.dispatch('submitForm', { data: formData.value, fromImport: false });
            }
              await router.push(pathname)
          }

          return {submitForm}
      }
  }
</script>