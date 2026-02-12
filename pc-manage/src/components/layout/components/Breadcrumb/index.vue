<template>
  <div class="breadcrumb-container">
    <el-breadcrumb v-if="levelList.length > 0" class="app-breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index !== levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <span v-else class="breadcrumb-name">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup name="Breadcrumb" lang="ts">
  import { ref, watchEffect } from 'vue'
  import { type RouteRecordName, useRoute } from 'vue-router'

  const route = useRoute()
  const levelList = ref<any[]>([])
  interface matchedInterface {
    path: string
    name?: string | RouteRecordName
    meta: {
      title?: string | undefined
      breadcrumb?: boolean
    }
  }

  function getBreadcrumb() {
    let matched: matchedInterface[] = route.matched.filter(
      item => item.meta?.title
    )
    levelList.value = matched.filter(
      item => item.meta?.title && !item.meta?.breadcrumb
    )
  }
  watchEffect(() => {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumb()
  })
  getBreadcrumb()
</script>

<style lang="less" scoped>
  .breadcrumb-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
    height: 100%;

    .app-breadcrumb {
      &.el-breadcrumb {
        display: inline-block;
        font-size: var(--font-size-14);
        line-height: var(--navbar-height);
        cursor: pointer;

        .no-redirect {
          color: var(--gray-color);
          font-size: var(--font-size-14);
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            color: var(--main-color);
          }
        }

        .breadcrumb-name {
          font-weight: 500;
          font-size: var(--font-size-14);
          color: var(--black-color);
          cursor: pointer;
        }

        :deep(.el-breadcrumb__separator) {
          color: var(--gray-color) !important;
          margin: 0 8px;
          font-size: var(--font-size-12);
        }
      }
    }
  }
</style>
