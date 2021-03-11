<template>
  <div class="card mt-3">
    <div class="card-header">
      {{ options.title ? options.title.text : '' }}
    </div>
    <div class="card-body" style="">
      <highcharts :options="options"></highcharts>
    </div>
    <div class="card-footer">
      <button  data-toggle="tooltip"
        data-placement="bottom"
        title="Bearbeiten"
        class="btn btn-outline-success"
        @click="editChart(chartId)"
      >
        <i class="fas fa-edit"></i>
      </button>
      <button
        class="btn btn-outline-danger"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Löschen"
        @click="deleteChart"
      >
        <i class="fas fa-trash"></i>
      </button>
      <div class="float-right">
        <button
          class="btn btn-outline-primary"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Show Iframe HTML Code (was man in andere Seiten einbetten kann)"
          @click="openModal"
        >
          <i class="fas fa-link"></i>
        </button>
        <button
          id="download_json"
          class="btn btn-outline-primary"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Chart downloaden (JSON)"
          @click="download"
        >
          <i class="fas fa-download"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" :id="'modal_'+ chartId"  tabindex="-1" :aria-labelledby="'modal_'+ chartId + 'Label'" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'modal_'+ chartId + 'Label'">Iframe einbetten</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="mx-3 my-1">
            Hier können Sie nun den untenstehenden HTML Code kopieren und überall in ihrer Webseite anzeigen lassen.
            Bitte beachten Sie, dass es nur in der selben Domain funktioniert.
          </p>
          <div class="input-group">
            <input type="text" :id="'embedChart_'+chartId" class="form-control" :value="embedHtml"/>
            <button :id="'clip_button_'+chartId" :data-clipboard-target="'#embedChart_'+chartId" class="clip btn btn-outline-secondary"><i class="far fa-clipboard"></i></button>
          </div>
          <p class="mx-3 mt-2 mt-5">
            Können Sie in Ihrem System aus irgendwelchen Gründen, den oben genannten Link nicht verwenden, so können Sie stadtdessen das Iframe hier unten kopieren, dass nicht
            den Iframe Resizer enthält, ein Tool um Iframes automatisch zu resizen.
          </p>
          <div class="input-group">
            <input type="text" :id="'iframe_'+chartId" class="form-control" :value="embedIframe"/>
            <button :id="'clip_button_'+chartId" :data-clipboard-target="'#iframe_'+chartId" class="clip btn btn-outline-secondary"><i class="far fa-clipboard"></i></button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Schließen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, onUnmounted } from 'vue';
  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
  import ClipboardJS from 'clipboard'
  import { useStore } from 'vuex';

  export default {
    props: {
      options: {
        type: Object,
        required: true
      },
      chartId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      let modal;
      const store = useStore();
      const router = useRouter();
      const url = window.location.origin + store.getters.pathName + '/charts' + '/' + props.chartId
      const scriptSrc = window.location.origin + store.getters.pathName + '/widget' + '/' + props.chartId + '.js'
      let clipboard;

      const containerDiv = document.createElement('div');
      containerDiv.id = `chart_${props.chartId}`
      const scriptTag = document.createElement('script')
      scriptTag.src = scriptSrc
      containerDiv.appendChild(scriptTag);

      const embedHtml = ref(containerDiv.outerHTML);


      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.height = '450'
      iframe.style.resize = 'both'
      iframe.style.overflow = 'auto'

      const embedIframe = ref(iframe.outerHTML)



      const pathname = store.getters.pathName;
      function deleteChart() {
        const result = confirm("Wollen Sie diese Chart wirklich löschen ?")
        if (result ) {
          store.dispatch('deleteChart', { id: props.chartId })
        }
      }

       function editChart(id){
        router.push(pathname + '/charts/'+ id + '/edit')
      }

      function download() {
        const chart = store.getters.chartList.filter(item => props.chartId === item.id);
        const jsonString =  JSON.stringify(chart[0].data)
        const blob = new Blob([jsonString], {type: 'application/json'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chart.json';
        link.click()
        URL.revokeObjectURL(link.href)

      }

      onMounted(function () {
        const element = document.getElementById(`modal_${props.chartId}`);
        modal = new bootstrap.Modal(element)
        clipboard = new ClipboardJS('.clip');
      })

      onUnmounted(function () {
        clipboard.destroy()
      })

      function openModal() {
        modal.show()
        console.log(modal);
      }
      function closeModal() {
        modal.hide()
      }
      return { deleteChart, editChart, download, openModal, closeModal, embedHtml, embedIframe }
    }
  }
</script>

  rails diagram_widget_generator:install:migrations