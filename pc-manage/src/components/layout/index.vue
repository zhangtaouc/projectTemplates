<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="deviceType !== 'pc' && !isCollapse"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar />
    <div
      :class="{
        hasTagsView: true,
        sidebarHide: false,
        'main-container': !isCollapse,
        'main-container-collapse': isCollapse,
        'mobeil-container': deviceType !== 'pc'
      }"
    >
      <div class="header-container" :class="{ 'fixed-header': false }">
        <navbar @set-layout="setLayout" />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { AppMain, Navbar, Sidebar } from './components'
  import { useStore } from '@/store'
  import { storeToRefs } from 'pinia'
  const store = useStore()
  const { deviceType, isCollapse } = storeToRefs(store)
  const classObj = computed(() => ({
    hideSidebar: isCollapse.value,
    openSidebar: !isCollapse.value,
    withoutAnimation: false,
    mobile: deviceType.value !== 'pc'
  }))

  function setLayout() {
    console.log('.setLayout')
  }

  function handleClickOutside() {
    store.isCollapse = !isCollapse.value
  }
</script>

<style lang="less" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    .main-container {
      position: relative;
      min-height: 100%;
      transition: margin-left 0.28s;
      margin-left: var(--base-sidebar-width);
    }
    .main-container-collapse {
      position: relative;
      min-height: 100%;
      transition: margin-left 0.28s;
      margin-left: var(--base-sidebar-width-collapse);
    }
    .mobeil-container {
      margin-left: 0px;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 400px);
    transition: width 0.28s;
  }
  .header-container {
    padding-bottom: var(--header-bottom-height);
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
