<template>
  <div class="breadcrumb-container">
    <el-breadcrumb v-if="levelList.length > 0" class="app-breadcrumb">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="
              item.redirect === 'noRedirect' || index !== levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <span v-else class="breadcrumb-name">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item key="menu" v-if="name">
          <span class="breadcrumb-nenu"
            >{{ name }}
            <img @click="closeMenu" class="close" alt="" />
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup name="Breadcrumb" lang="ts">
  import { ref, watchEffect, computed } from 'vue'
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

  const name = computed(() => {
    return '123'
  })

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

  function closeMenu() {
    // menuStore.addSubNavBar('')
  }
</script>

<style lang="less" scoped>
  .breadcrumb-container {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 100%;

    .app-breadcrumb.el-breadcrumb {
      display: inline-block;
      font-size: 14px;
      line-height: 50px;
      margin-left: 8px;

      .no-redirect {
        color: #97a8be;
        font-size: 16px;
        cursor: text;
      }
      .breadcrumb-name {
        // font-weight: 400;
        font-weight: normal;
        font-size: 16px;
        // color: #3a3f63;
        color: #000;
      }
    }
    .breadcrumb-nenu {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-bottom: 2px;
      .close {
        margin-left: 2px;
      }
    }
  }
  :deep(.el-breadcrumb__separator) {
    color: #000 !important;
  }
</style>
