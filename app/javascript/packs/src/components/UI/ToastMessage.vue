<template>
  <teleport to="body">
    <div style="position: absolute; top: 10px; right: 100px">
      <div :id="toastIdName" class="toast bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="mr-auto">Fehlermeldung</strong>
          <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>


<script>
  import { onMounted } from 'vue';
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
  export default {
    emits: ['sendToast'],
    props: {
      toastIdName: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }){
      onMounted(function () {
        let element = document.getElementById(props.toastIdName);
        let toast =  new bootstrap.Toast(element);
        emit('sendToast', toast)
      })
    }



  }
</script>