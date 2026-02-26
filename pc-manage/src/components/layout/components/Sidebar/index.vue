<template>
  <div
    :class="{
      'mobile-collapse': isCollapse && deviceType !== 'pc'
    }"
    class="sidebar-container"
    :style="{ backgroundColor: 'rgb(245, 246, 250)' }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :default-active="activeMenu"
        :collapse="isCollapse"
        text-color="#3A3F63"
        :unique-opened="true"
        :active-text-color="'var(--main-color)'"
        :collapse-transition="false"
        mode="vertical"
        background-color="#F5F6FA"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Logo from './Logo.vue'
  import SidebarItem from './SidebarItem.vue'
  import { useStore } from '@/store'
  import { storeToRefs } from 'pinia'
  import { useRouterStore } from '@/store/routerStore'
  const store = useStore()
  const { isCollapse, deviceType } = storeToRefs(store)
  const xRoute = useRoute()

  const sidebarRouters = computed(() => useRouterStore().pageList)
  const showLogo = computed(() => true)

  const activeMenu = computed(() => {
    const { meta, path } = xRoute
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
</script>
<style lang="less" scoped>
  .sidebar-container {
    transition: width 0.28s;
    width: var(--base-sidebar-width) !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);

    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
      width: 0px !important;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;

      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
        width: 0px !important;
      }
    }
  }
  .mobile-collapse {
    transition-duration: 0.3s;
    transform: translate3d(var(--base-sidebar-width-hidden), 0, 0);
  }

  .hideSidebar {
    .sidebar-container {
      width: 54px !important;
    }
  }

  .mobile {
    .sidebar-container {
      transition: transform 0.28s;
      width: var(--base-sidebar-width) !important;
    }
  }
</style>
