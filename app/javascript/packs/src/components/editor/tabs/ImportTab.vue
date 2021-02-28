<template>
  <toast-message toastIdName="toast_json" @send-toast="setToast">
    Fehlerhafte JSON-Datei. Sie konnte nicht geparsed werden.
  </toast-message>
  <div class="btn btn-outline-secondary w-100">
    <input  @change="uploaded($event)" type="file" id="file" accept="application/json">
    <label style="width: 100%; cursor:pointer" for="file">Import(JSON)</label>
  </div>

</template>
<script>
  import { useStore } from 'vuex';
  import ToastMessage from "../../UI/ToastMessage";
  export default {
    components: {
      ToastMessage
    },
      setup(){
        let toast;
        const store = useStore();
        function uploaded(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = loaded;
          reader.onerror = errorHandler
        }

        function loaded(event) {
          const string = event.target.result;
          try {
            const test = JSON.parse(string);
            const decodedJsonString = encodeURIComponent(string)
            store.state.highChartsOptions = test;
          } catch (e) {
            toast.show();
            return false;
          }
          event.target.value = '';
        }

        function errorHandler(event) {
          if(event.target.error.name === 'NotReadableError'){
            console.log('Syntax ist falsch');
          }
        }

        function setToast(payload) {
          toast = payload
        }

        return { uploaded, setToast }
      }
  }
</script>

<style scoped>
  #file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
