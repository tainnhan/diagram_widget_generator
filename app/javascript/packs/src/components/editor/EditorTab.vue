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
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
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
      const store = useStore();
      const tabs = computed(function () {
        return store.getters.tabs.data;
      })
      const tab = computed(function () {
        return store.getters.tabs.selected;
      })
      function changeTab(selectedTab) {
        store.dispatch('setTab', selectedTab);
      }

      return { tab, changeTab,tabs  }
    }
  }
</script>

