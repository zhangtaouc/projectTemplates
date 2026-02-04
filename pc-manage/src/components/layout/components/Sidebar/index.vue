<template>
  <div
    :class="{ 'has-logo': showLogo }"
    class="sidebar-container"
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
<style lang="less" scoped>
  #app {
    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s;
      margin-left: var(--base-sidebar-width);
      position: relative;
    }

    .sidebarHide {
      margin-left: 0 !important;
    }

    .sidebar-container {
      transition: width 0.28s;
      width: var(--base-sidebar-width) !important;
      background-color: red;
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

      .horizontal-collapse-transition {
        transition:
          0s width ease-in-out,
          0s padding-left ease-in-out,
          0s padding-right ease-in-out;
      }

      .scrollbar-wrapper {
        overflow-x: hidden !important;

        &::-webkit-scrollbar {
          display: none;
          /* Chrome Safari */
          width: 0px !important;
        }
      }

      .el-scrollbar__bar.is-vertical {
        right: 0px;
      }

      .el-scrollbar {
        height: 100%;
      }

      &.has-logo {
        .el-scrollbar {
          height: calc(100% - 50px);
        }
      }

      .is-horizontal {
        display: none;
      }

      a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
      }

      .svg-icon {
        margin-right: 16px;
        cursor: pointer;
      }

      .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
      }

      .el-menu-item,
      .menu-title {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      // menu hover
      .sub-menu-title-noDropdown,
      .el-sub-menu__title {
        color: red !important;
        font-weight: 500;
        font-size: 18px;

        &:hover {
          // 系统管理，系统监控的hover
          // background-color: rgba(0, 0, 0, 0.06) !important;
          background-color: black !important;
        }
      }

      & .theme-dark .is-active > .el-sub-menu__title {
        color: pink !important;
        font-weight: 500;
      }

      & .nest-menu .el-sub-menu > .el-sub-menu__title,
      & .el-sub-menu .el-menu-item {
        min-width: var(--base-sidebar-width) !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.06) !important;
        }
      }

      & .theme-dark .nest-menu .el-sub-menu > .el-sub-menu__title,
      & .theme-dark .el-sub-menu .el-menu-item {
        background-color: red !important;

        &:hover {
          background-color: yellow !important;
        }
      }
    }

    .hideSidebar {
      .sidebar-container {
        width: 54px !important;
      }

      .main-container {
        margin-left: 54px;
      }

      .sub-menu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .el-tooltip {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }
        }
      }

      .el-sub-menu {
        overflow: hidden;
        display: flex;
        justify-content: center;

        & > .el-sub-menu__title {
          padding: 0 !important;

          .svg-icon {
            margin-left: 20px;
          }
        }
      }

      .el-menu--collapse {
        .el-sub-menu {
          & > .el-sub-menu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }

            & > i {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }

    .el-menu--collapse .el-menu .el-sub-menu {
      min-width: var(--base-sidebar-width) !important;
    }

    // mobile responsive
    .mobile {
      .main-container {
        margin-left: 0px;
      }

      .sidebar-container {
        transition: transform 0.28s;
        width: var(--base-sidebar-width) !important;
      }

      &.hideSidebar {
        .sidebar-container {
          pointer-events: none;
          transition-duration: 0.3s;
          transform: translate3d(-var(--base-sidebar-width), 0, 0);
        }
      }
    }

    .withoutAnimation {
      .main-container,
      .sidebar-container {
        transition: none;
      }
    }
  }

  // when menu collapsed
  .el-menu--vertical {
    & > .el-menu {
      .svg-icon {
        margin-right: 16px;
      }
    }

    .nest-menu .el-sub-menu > .el-sub-menu__title,
    .el-menu-item {
      &:hover {
        background-color: yellow !important;
      }
    }

    // the scroll bar appears when the sub-menu is too long
    > .el-menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }

      .nest-menu {
        .el-menu-item {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          position: relative;
          // right: 16px;
          color: var(--black-color-40);

          &:hover {
            background-color: blue !important;
          }

          &.is-active {
            font-weight: 500;
            color: var(--main-color) !important;
            font-size: 16px;
            background-color: red !important;
          }
        }
      }
    }
  }

  #app .sidebar-container .theme-dark .el-sub-menu .el-menu-item {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    position: relative;
    // right: 16px;
    color: var(--black-color-40);

    &.is-active {
      font-weight: 500;
      font-size: 16px;

      // background-color: rgba(36, 104, 241, 0.1) !important;
      .menu-title {
        // background-color: #fff !important;
      }
    }
  }

  // #app .sidebar-container .theme-dark .nest-menu {
  //   // width: 80%;
  //   // margin: 0 auto;
  // }
  #app .sidebar-container .el-menu-item {
    &:hover {
      background-color: #f5f6fa !important;
    }
  }

  #app
    .sidebar-container
    .theme-dark
    .nest-menu
    .el-sub-menu
    > .el-sub-menu__title,
  #app .sidebar-container .theme-dark .el-sub-menu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .el-menu-item .menu-title {
    color: var(--black-color-40) !important;
  }

  // .is-active .menu-title {
  //   color: $blue !important;
  // }
</style>
