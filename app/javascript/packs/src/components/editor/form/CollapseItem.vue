<template>
  <div class="bg-light mb-1">
    <div class="accordion" :id="'accordion'+ settingName ">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="'heading'+ settingName">
          <button class="accordion-button text-dark bg-light" :disabled="isDisabled" @click="clickCollapse" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+ settingName" aria-expanded="true" :aria-controls="'collapse'+ settingName">
            {{ settingName }}
          </button>
        </h2>
        <div :id="'collapse'+ settingName" class="accordion-collapse collapse" :aria-labelledby="'heading' + settingName " :data-bs-parent="'accordion'+ settingName ">
          <div class="accordion-body bg-white">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
  import { onMounted,ref } from 'vue';
  export default {
    props: {
      settingName: {
        required: true,
        type: String
      }
    },
    setup(props) {
      let collapse;
      let isHidden = ref(true);
      let isDisabled = ref(false);

      function clickCollapse() {
        isHidden.value = !isHidden.value;
        if (isHidden.value) {
          collapse.hide();
        } else {
          collapse.show();
        }
      }

      onMounted(function () {
        const myCollapse = document.getElementById('collapse' + props.settingName);
        collapse = new bootstrap.Collapse(myCollapse, {
          toggle: false
        })

        myCollapse.addEventListener('hide.bs.collapse', function () {
          isDisabled.value = true;
        })
        myCollapse.addEventListener('hidden.bs.collapse', function () {
          isDisabled.value = false;

        })
        myCollapse.addEventListener('show.bs.collapse', function () {
          isDisabled.value = true;
        })
        myCollapse.addEventListener('shown.bs.collapse', function () {
          isDisabled.value = false;
        })
      })

      return {clickCollapse, isDisabled}


    }
  }
</script>

<style scoped>
  .white-bg{
    background:#ffffff !important;
  }
</style>