<template>
  <section>
    <div class="form-check mb-3">
      <input id="enable_credits" class="form-check-input" type="checkbox" v-model="credits.enableCredits"/>
      <label class="form-check-label">Credits anzeigen</label>
    </div>
    <div v-if="credits.enableCredits" class="mb-3">
      <label for="credits_text" class="form-label">Credits Text</label>
      <input id="credits_text" type="text" class="form-control" v-model="credits.text"/>
    </div>
    <div class="mb-3" v-if="credits.enableCredits">
      <label for="credits_links" class="form-label">Credits Link</label>
      <input id="credits_links" type="text" class="form-control" v-model="credits.link"/>
    </div>
  </section>

  <section>
    <div class="mb-3 form-check">
      <input class="form-check-input" type="checkbox" id="enable_captions" v-model="captions.enableCaptions" />
      <label for="enable_captions" class="form-check-label">Bildunterschrift anzeigen</label>
    </div>
    <div v-if="captions.enableCaptions" class="mb-3">
      <label for="captions_text" class="form-label">Bildunterschrift Text</label>
      <input id="captions_text" type="text" class="form-control" v-model="captions.text"/>
    </div>
  </section>
</template>

<script>
  import { useStore } from 'vuex';
  import { reactive, watch } from 'vue';
  export default {
    setup() {
      const store = useStore();
      const credits = reactive({
        enableCredits: true,
        text: '',
        link: ''
      });

     watch(credits, function (newValue) {
        store.dispatch('changeChartsProperties', {
          property: 'credits',
          data: {
            enabled: newValue.enableCredits,
            text: newValue.text,
            href: newValue.link
          }
        })
     })

      const captions = reactive({
        enableCaptions: false,
        text: ''
      })

      watch(captions, function (newValue) {
        if(!newValue.enableCaptions){
          newValue.text = ''
        }
        store.dispatch('changeChartsProperties', {
          property: 'caption',
          data: {
            text: newValue.text
          }
        })
      })

      return { credits, captions }
    }
  }
</script>