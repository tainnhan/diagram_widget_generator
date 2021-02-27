<template>
  <ul class="nav nav-tabs">
    <li v-for="tab in tabs" :key="tab.name" class="nav-item">
      <div class="nav-link" :class="{'active text-primary': tab.isActive }" @click="changeTab(tab.name)" style="cursor: pointer">{{ tab.text }}</div>
    </li>
  </ul>
  <div class="m-3">
    <component :is="tab"></component>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import DataTab from "./tabs/DataTab";
  import ImportTab from "./tabs/ImportTab";
  import SettingsTab from "./tabs/SettingsTab";
  export default {
    components: {
      DataTab,
      ImportTab,
      SettingsTab
    },
    setup(){
      const tabs = ref([
        { name: 'data-tab', text: 'Daten', isActive: true },
        { name: 'import-tab', text: 'Import', isActive: false },
        { name: 'settings-tab', text: 'Einstellungen', isActive: false }
      ])
      const tab = ref('data-tab');
      function changeTab(selectedTab) {
        tab.value = selectedTab;
        tabs.value.forEach(tab => {
          tab.isActive = tab.name === selectedTab;
        })
      }

      return { tab, changeTab,tabs  }
    }
  }
</script>

