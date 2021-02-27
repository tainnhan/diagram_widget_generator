<template>
  <div id="container" class="container mt-5">

    <div class="row">
      <div class="col-6">
        <div style="min-height: 500px" class="card">
          <!-- Progress bar -->
          <div class="card-header">
            <ul class="progress-indicator mt-3">
              <li class="completed"> <span class="bubble"></span> Titel </li>
              <li :class="{completed: screen === 'second-screen' || screen === 'third-screen'}" > <span class="bubble"></span> Diagramm </li>
              <li :class="{completed: screen === 'third-screen'}" > <span class="bubble" ></span> Daten </li>
            </ul>
          </div>
          <component @change-screen="changeScreen" :is="screen" ></component>
        </div>
      </div>
      <div class="col-6">
        <div class="card my-auto" style="min-height: 500px">
          <div class="card-header text-center">
            <p style="font-size: 18px">Diagrammvorschau</p>
            </div>
          <highcharts-preview ></highcharts-preview>
          <div class="card-footer" style="height: 40px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FirstScreen from "../wizard/FirstScreen";
  import SecondScreen from "../wizard/SecondScreen";
  import ThirdScreen from "../wizard/ThirdScreen";
  import { useStore } from 'vuex';
  import { ref, onUnmounted } from 'vue';
  import HighchartsPreview from "../highcharts/HighchartPreview";
  import {useRoute} from "vue-router";

  export default {
    components: {
      HighchartsPreview,
      FirstScreen,
      SecondScreen,
      ThirdScreen,
    },
    setup(props){
        const screen = ref('first-screen');
        const store = useStore();
        console.log(store.getters.highChartsOptions);

        function changeScreen(data) {
          screen.value = data;
        }


        return { screen, changeScreen }
      }
    }
</script>
