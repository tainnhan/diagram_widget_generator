<template>
  <div id="container" class="container-fluid">
    <div class="row">
      <div class="col-sm-4 col-12 border-right" style="height: 100vh">
        <editor-tab></editor-tab>
      </div>
      <div class="col-sm-8 col-12 pl-0 pr-0 bg-editor">
        <editor-nav ></editor-nav>
        <editor-preview></editor-preview>
      </div>
    </div>
  </div>
</template>

<script>
  import EditorTab from "../editor/EditorTab";
  import { onUnmounted} from 'vue'
  import {useStore} from 'vuex';
  import EditorNav from "../editor/EditorNav";
  import EditorPreview from "../editor/EditorPreview";
  export default {
    components: {
      EditorTab,
      EditorNav,
      EditorPreview
    },
    setup(){
      const store = useStore()
      onUnmounted(function () {
        store.dispatch('setTab', 'data-tab')
      })
    }
  }
</script>

<style scoped>
  .bg-editor{
    background-color: #ababab;
  }
</style>