<template>
  <div class="form-check">
    <input class="form-check-input" id="enable_tooltip" type="checkbox" v-model="enableTooltip">
    <label for="enable_tooltip" class="form-check-label">Tooltip anzeigen</label>
  </div>
  <div>
    <div class="form-check">
      <input class="form-check-input" id="enable_shared_tooltip" type="checkbox" v-model="enableSharedTooltip">
      <label for="enable_shared_tooltip" class="form-check-label">Tooltips werden geteilt</label>
    </div>
  </div>
  <section>
    <div class="mb-3">
      <label for="background_color_tooltip" class="form-label">Hintergrundfarbe</label>
        <input
          id="background_color_tooltip"
          type="color"
          class="form-control-color form-color"
          v-model="backgroundColorTooltip"
        />
    </div>
    <div class="mb-3">
      <label class="form-label" for="border_width_tooltip">Border Width</label>
      <input
        id="border_width_tooltip"
        type="number"
        v-model="borderWidthTooltip"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="border_radius_tooltip">Border Radius</label>
      <input
        id="border_radius_tooltip"
        type="number"
        v-model="borderRadiusTooltip"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="border_color_tooltip" class="form-label">Border Farbe</label>
      <input
        id="border_color_tooltip"
        type="color"
        class="form-control-color form-color"
        v-model="borderColorTooltip"
      />
    </div>
  </section>
</template>
<script>
  import { ref, watch } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup(){
      const store = useStore()
      const enableTooltip = ref(true)
      const enableSharedTooltip = ref(false);
      const backgroundColorTooltip = ref('#f7f7f7')
      const borderWidthTooltip = ref(1);
      const borderRadiusTooltip = ref(3);
      const borderColorTooltip = ref(undefined)



      watch( [
        backgroundColorTooltip,
        borderWidthTooltip,
        borderRadiusTooltip,
        borderColorTooltip,
        enableTooltip,
        enableSharedTooltip
      ],function (newValues) {
        store.dispatch('changeChartsProperties', {
          property: 'tooltip',
          data: {
            backgroundColor: newValues[0],
            borderWidth: newValues[1],
            borderRadius: newValues[2],
            borderColor: newValues[3],
            enabled: newValues[4],
            shared: newValues[5],
            crosshairs: newValues[5]
          }
        })
      })


      return {
        enableTooltip,
        enableSharedTooltip,
        backgroundColorTooltip,
        borderWidthTooltip,
        borderRadiusTooltip,
        borderColorTooltip
      }
    }
  }
</script>

<style scoped>
  .form-color {
    width: 100%;
    max-width: 100%;
  }
</style>