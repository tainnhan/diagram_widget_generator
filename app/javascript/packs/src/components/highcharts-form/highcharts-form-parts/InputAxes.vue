<template>
<h3>Achsen Konfiguration</h3>
  <div class="form-check mb-3">
    <input id="inverse_axis" v-model="inverseAxis" type="checkbox" class="form-check-input"/>
    <label for="inverse_axis">Achsen umkehren</label>
  </div>
  <section>
    <div class="mb-3">
      <label for="xAxis_text" class="form-label">X-Achse Text</label>
      <input class="form-control" id="xAxis_text" type="text" v-model="xAxisOptions.text" >
    </div>
    <div class="form-check mb-3">
      <input id="opposite_xAxis" v-model="xAxisOptions.opposite" type="checkbox" class="form-check-input"/>
      <label for="opposite_xAxis" >X-Achse invertieren</label>
    </div>
    <!--
      <div class="form-check mb-3" v-if="series.length > 1">
        <input id="both_side_xAxis" v-model="xAxisOptions.both" type="checkbox" class="form-check-input"/>
        <label for="both_side_xAxis" >X-Achse auf beiden Seiten abbilden</label>
      </div>
      <div v-if="xAxisOptions.both" class="mb-3">
        <input  class="form-control" type="text" placeholder="Text für die zweite X-Achse..." v-model="xAxisOptions.text_2">
      </div>
    -->

    <div class="form-check mb-3">
      <input id="reverse_xAxis" v-model="xAxisOptions.reverse" type="checkbox" class="form-check-input"/>
      <label for="reverse_xAxis" >X-Achse Werte inversieren</label>
    </div>

  </section>
  <section>
    <div class="mb-3">
      <label for="yAxis_text" class="form-label">Y-Achse Text</label>
      <input class="form-control" id="yAxis_text" type="text" v-model="yAxisOptions.text" >
    </div>
    <div class="form-check mb-3">
      <input id="opposite_yAxis" v-model="yAxisOptions.opposite" type="checkbox" class="form-check-input"/>
      <label for="opposite_yAxis" >Y-Achse invertieren</label>
    </div>
    <!--
    <div class="form-check mb-3" v-if="series.length > 1">
      <input id="both_side_yAxis" v-model="yAxisOptions.both" type="checkbox" class="form-check-input"/>
      <label for="both_side_yAxis" >Y-Achse auf beiden Seiten abbilden</label>
    </div>
    <div v-if="yAxisOptions.both" class="mb-3">
      <input  class="form-control" type="text" placeholder="Text für die zweite Y-Achse..." v-model="xAxisOptions.text_2">
    </div>
    -->
    <div class="form-check mb-3">
      <input id="reverse_yAxis" v-model="yAxisOptions.reverse" type="checkbox" class="form-check-input"/>
      <label for="reverse_yAxis">Y-Achse Werte inversieren</label>
    </div>
  </section>
  <button
          type="button"
          class="btn btn-outline-primary mt-3 float-right"
          @click="setFormPart"
  >Weiter</button>
</template>

<script>
  import { ref, reactive, watch } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup(){
      const store = useStore();
      const inverseAxis = ref(false)
      const xAxisOptions = reactive({
        text: '',
        text_2: '',
        opposite: false,
        reverse: false,
        both: false
      })
      const yAxisOptions = reactive({
        text: '',
        text_2: '',
        opposite: false,
        reverse: false,
        both: false
      });
      const series = store.getters.highChartsOptions['series']



      const chartOptions = {...store.getters.highChartsOptions['chart']}

      watch(inverseAxis, function (newValue) {
        store.dispatch('changeChartsProperties', {
          property: 'chart', data: { chartOptions, inverted: newValue }
        })
      })

      /*****************************************************************
       * ********     X-Achse Konfigurationen       ********************
       *****************************************************************/


      const xAxis = store.getters.highChartsOptions['xAxis']

      function xAxisData(newValue, both = false){
        return {
          type: xAxis.type,
          categories: xAxis.categories,
          title: {
            text: both ? newValue.text_2 : newValue.text
          },
          reversed: newValue.reverse,
          opposite: both ? !newValue.opposite : newValue.opposite
        }
      }

      watch(xAxisOptions, function (newValue) {
        if(newValue.both && series.length > 1) {
          store.dispatch('changeChartsProperties', {
            property: 'xAxis',
            data: [xAxisData(newValue), xAxisData(newValue, true)]
          });

          // Später darauf zurück um in einen Action zu ändern, da bad practice
          series[0]['xAxis'] = 1;
        } else {
          // Später darauf zurück um in einen Action zu ändern, da bad practice
          series[0]['xAxis'] = 0;
          store.dispatch('changeChartsProperties', {
            property: 'xAxis',
            data: [xAxisData(newValue)]
          });
        }
      })

      /*****************************************************************
       * ********     Y-Achse Konfigurationen       ********************
       *****************************************************************/

      function yAxisData(newValue, both = false) {
        return {
          title: {
            text: both ? newValue.text_2 : newValue.text
          },
          opposite: both ? !newValue.opposite : newValue.opposite,
          reversed: newValue.reverse
        }
      }


      watch(yAxisOptions, function (newValue) {
        if(series.length > 1 && newValue.both) {
          store.dispatch('changeChartsProperties', {
            property: 'yAxis',
            data: [yAxisData(newValue), yAxisData(newValue, true)]
          })
          series[1]['yAxis'] = 1;
        } else {
          series[1]['yAxis'] = 0;
          store.dispatch('changeChartsProperties', {
            property: 'yAxis',
            data: [yAxisData(newValue)]
          })
        }

      })
      
      function setFormPart() {
        store.dispatch('setFormPart', {
          data: 'InputSeries'
        })
      }


      return {
        inverseAxis,
        xAxisOptions,
        yAxisOptions,
        series,
        setFormPart
      };
    }
  }
</script>