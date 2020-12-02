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
  import { useRouter } from 'vue-router'
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
        const formData = computed(function () {
             return store.getters.highChartsOptions;
        })

         async function submitForm() {
          await store.dispatch('submitForm', {
              data: formData.value
          });
          await router.push('/diagram')
          }

          return {submitForm}
      }
  }
</script>