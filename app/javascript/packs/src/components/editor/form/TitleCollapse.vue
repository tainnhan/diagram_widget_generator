<template>
  <div @click="openCollapse" class="border row bg-light mx-0" :class="{'d-none': isHidden,'border-bottom-0': hideBorderBottom }" style="cursor:pointer" >
    <div class="col-2 text-left">
      <h4 class="mt-2">Titel</h4>
    </div>
    <div class="col-10 text-right">
      <i class="fas fa-angle-up fa-2x mt-1"></i>
    </div>
  </div>
  <div class="border-right border-left border-bottom collapse" id="collapseExample">
    <div @click="closeCollapse" class="row mx-1 border-top" :class="{'d-none': !isHidden}" style="cursor:pointer" >
      <div class="col-2 text-left">
        <h4 class="mt-2">Titel</h4>
      </div>
      <div class="col-10 text-right">
        <i class="fas fa-angle-up fa-2x mt-1"></i>
      </div>
  </div>
    <div class="m-2">
      <title-text></title-text>
      <title-align></title-align>
      <title-vertical-align></title-vertical-align>
    </div>
  </div>
</template>

<script>
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
  import TitleText from "../../form/options/title/TitleText";
  import TitleAlign from "../../form/options/title/TitleAlign";
  import TitleVerticalAlign from "../../form/options/title/TitleVerticalAlign";
  import { onMounted,ref } from 'vue';
  import SettingsTab from "../tabs/SettingsTab";
  export default {
    components: {
      SettingsTab,
      TitleText,
      TitleAlign,
      TitleVerticalAlign
    },
    setup() {
      let collapse;
      const isHidden = ref(false);
      const hideBorderBottom = ref(false);
      function openCollapse(){
        isHidden.value = true;
        collapse.show();
      }
      function closeCollapse(){
        isHidden.value = false;
        collapse.hide();
      }

      onMounted(function () {
        const myCollapse = document.getElementById('collapseExample')
        collapse = new bootstrap.Collapse(myCollapse, {
          toggle: false
        })

        myCollapse.addEventListener('hide.bs.collapse', function () {
          hideBorderBottom.value = true;
        })


        myCollapse.addEventListener('hidden.bs.collapse', function () {
          hideBorderBottom.value = false;
        })
      })

      return { openCollapse,closeCollapse, isHidden, hideBorderBottom}
    }

  }
</script>

<style scoped>

</style>