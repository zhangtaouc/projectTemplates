<template>
  <div>
    <ProgressBar ref="progressBar" />
    <router-view />
  </div>
</template>
<script setup lang="ts">
  import ProgressBar from '@/components/progressBar/ProgressBar.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from './store'

  const store = useStore()
  store.isSHowVisitBtn = localStorage.getItem('isSHowVisitBtn') === 'true'
  const router = useRouter()
  const progressBar = ref()
  router.beforeEach((to, from, next) => {
    if (progressBar.value && to.path !== from.path) {
      progressBar.value.simulatePageLoad()
    }
    next()
  })
</script>
<style lang="less">
  .main-page {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 1px 0 0;
    margin: 0;
    background-color: var(--bg-color);
    .content-container {
      position: relative;
      box-sizing: border-box;
      padding: var(--content-padding);
      margin: 0 var(--content-padding);
      background-color: var(--white-color);
      border-radius: var(--border-radius-12);
      overflow: hidden;
    }
  }
  .page-bottom-block {
    width: 100%;
    height: 34px;
    /* 小屏 iPhone：SE/5/5s/5c 320px */
    @media screen and (min-width: 320px) and (max-width: 374px) {
      height: 46px !important;
    }
    /* 主流小屏：iPhone6/7/8/X/XS/11Pro 375px */
    @media screen and (min-width: 375px) and (max-width: 389px) {
      height: 46px !important;
    }
    /* 新款主流：iPhone12/13/14/15 标准版 390px */
    @media screen and (min-width: 390px) and (max-width: 413px) {
      height: 46px !important;
    }
    /* 大屏：iPhone6P/7P/8P/XR/11/Plus系列 414px */
    @media screen and (min-width: 414px) and (max-width: 427px) {
      height: 46px !important;
    }
    /* 超大屏：iPhone15/16 Pro Max 428px */
    @media screen and (min-width: 428px) {
      height: 46px !important;
    }
    /* iOS 刘海屏/灵动岛 安全区适配 (iPhoneX及以上所有全面屏) */
    @media screen and (orientation: portrait) {
      height: 46px !important;
    }
    /* iPad 平板 768px+ */
    @media screen and (min-width: 768px) {
      height: 46px !important;
    }

    /* ========== 【仅 安卓 所有设备】 全安卓机型 媒体查询  ========== */
    @supports not (-webkit-touch-callout: none) {
      /* 安卓小屏机 320-375px */
      @media screen and (min-width: 320px) and (max-width: 375px) {
      }
      /* 安卓主流屏 375-420px 小米/华为/OPPO/VIVO旗舰机 */
      @media screen and (min-width: 375px) and (max-width: 420px) {
      }
      /* 安卓大屏机 420-480px 大屏旗舰/游戏手机 */
      @media screen and (min-width: 420px) and (max-width: 480px) {
      }
      /* 安卓折叠屏/平板 480px+ 所有大屏安卓设备 */
      @media screen and (min-width: 480px) {
      }
    }

    @media screen and (orientation: landscape) {
    }
    /* 竖屏 */
    @media screen and (orientation: portrait) {
    }
  }
  .validation-message {
    position: absolute;
    height: 20px;
    bottom: -20px;
    left: 16px;
    color: var(--color-error);
    font-size: 12px;
    animation: validation-message-fade-in 0.3s ease-in-out;
  }
  @keyframes validation-message-fade-in {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
