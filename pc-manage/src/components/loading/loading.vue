<template>
  <div class="loading-container">
    <!-- 内容容器 -->
    <div class="loading-content">
      <!-- Logo -->
      <div class="loading-logo">
        <img src="@/assets/images/logo.svg" alt="Logo" class="logo-img" />
      </div>
      <!-- 三点动画 -->
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    z-index: 9999;
  }
  .loading-content {
    padding-bottom: 40px;
    .loading-logo {
      margin-bottom: 20px;
      animation: fadeIn 0.6s ease-in-out;
    }

    .logo-img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }

    .loading-text {
      font-size: 16px;
      font-weight: 500;
      color: var(--black-color-60);
      margin-bottom: 20px;
      animation: fadeIn 0.6s ease-in-out 0.2s both;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
      animation: fadeIn 0.6s ease-in-out 0.4s both;
    }

    .dot {
      width: 8px;
      height: 8px;
      background-color: var(--main-color);
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }

    .dot:nth-child(1) {
      animation-delay: -0.32s;
    }

    .dot:nth-child(2) {
      animation-delay: -0.16s;
    }
  }

  /* 动画定义 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
</style>
