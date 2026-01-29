<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{ backgroundColor: 'rgb(245, 246, 250)' }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
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
  const store = useStore()
  const xRoute = useRoute()

  const sidebarRouters = computed(() => [
    {
      component: undefined,
      componentName: 'Layout',
      embedded: 0,
      icon: 'User',
      menuId: '1',
      menuType: 0,
      meta: {
        title: '任务列表'
      },
      path: '/taskList',
      permission: 'auth:user',
      sortOrder: 1,
      title: '任务列表',
      visible: 1
    },
    {
      component: undefined,
      componentName: 'Layout',
      embedded: 0,
      icon: 'User',
      menuId: '1',
      menuType: 0,
      meta: {
        title: '走访清单管理'
      },
      path: '/companyManage',
      permission: 'auth:user',
      sortOrder: 1,
      title: '走访清单管理',
      visible: 1
    }
  ])
  const showLogo = computed(() => true)
  const isCollapse = computed(() => store.isCollapse)

  const activeMenu = computed(() => {
    const { meta, path } = xRoute
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
</script>
