<template>
  <div ref="progressBar" class="progress-bar">
    <div ref="progressBarFill" class="progress-bar-fill" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const progressBar = ref<HTMLElement | null>(null)
  const progressBarFill = ref<HTMLElement | null>(null)

  // 模拟页面加载进度
  const simulatePageLoad = () => {
    if (!progressBar.value || !progressBarFill.value) {
      return
    }

    // 显示进度条
    progressBar.value.style.opacity = '1'

    let progress = 0
    const increment = 1 // 每次增加1%
    const speed = 10 // 每20毫秒更新一次，总时长约1秒

    const interval = setInterval(() => {
      progress += increment

      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // 进度完成后隐藏进度条
        setTimeout(() => {
          progressBar.value!.style.opacity = '0'
          progressBarFill.value!.style.width = '0%'
        }, 500)
      }
      if (progressBarFill.value) {
        // 更新进度条宽度
        progressBarFill.value.style.width = `${progress}%`
      }
    }, speed)
  }
  defineExpose({
    simulatePageLoad
  })
</script>
<style scoped lang="less">
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;

    .progress-bar-fill {
      height: 100%;
      background-color: var(--main-color);
      transition: width 0.2s ease;
    }
  }
</style>
