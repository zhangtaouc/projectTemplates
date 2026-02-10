<template>
  <section class="app-main">
    <div
      class="inner"
      :class="{ innerOver: hiddenScroll }"
      @scroll="handleScroll($event as any)"
    >
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  const cachedViews = computed(() => {
    return ''
  })

  const hiddenScroll = ref(true)
  const handleScroll = (e: { target: { scrollTop: any } }) => {
    let timer: any = null
    const lastScroll = e.target.scrollTop
    clearTimeout(timer)
    hiddenScroll.value = false
    // hiddenScroll.value = true
    timer = setTimeout(() => {
      if (lastScroll === e.target.scrollTop) {
        hiddenScroll.value = true
      }
    }, 500)
  }
</script>

<style lang="less" scoped>
  .app-main {
    height: var(--app-height);
    width: 100%;
    position: relative;
    background-color: var(--bg-color);
    box-sizing: border-box;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    // .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
    // }

    .fixed-header + .app-main {
      padding-top: 84px;
    }
  }
</style>

<style lang="less">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 17px;
    }
  }
</style>
