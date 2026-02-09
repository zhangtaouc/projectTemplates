<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@/assets/images/logo.svg" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.svg" class="sidebar-logo" />
        <div class="sidebar-title">弓长水寿科技</div>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts" name="Logo">
  defineProps({
    collapse: {
      type: Boolean,
      required: true
    }
  })
</script>

<style lang="less" scoped>
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 80px;
    line-height: 80px;
    // background: #2b2f3a;
    background: rgb(245, 246, 250);
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 28px;
        height: 28px;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: var(--black-color);
        font-weight: block;
        line-height: 20px;
        font-size: 16px;
        vertical-align: middle;
        animation: move 2s;
        font-weight: bold;
      }
    }

    &.collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
  @keyframes move {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.6;
    }

    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
</style>
