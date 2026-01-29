<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->
    <Sidebar class="sidebar-container" />
    <div
      :class="{ hasTagsView: true, sidebarHide: false }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': false }">
        <navbar @set-layout="setLayout" />
        <!-- <navTitle /> -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { AppMain, Navbar, Sidebar } from './components'
  import { useStore } from '@/store'
  const store = useStore()
  const classObj = computed(() => ({
    hideSidebar: store.isCollapse,
    openSidebar: !store.isCollapse,
    withoutAnimation: false,
    mobile: false
  }))

  function setLayout() {
    console.log('.setLayout')
  }
</script>

<style lang="less" scoped>
  .app-wrapper {
    // @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
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

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
