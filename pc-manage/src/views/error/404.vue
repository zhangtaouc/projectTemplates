<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">
        <div class="icon-404">404</div>
      </div>
      <h2 class="not-found-subtitle">页面不存在</h2>
      <p class="not-found-description">
        抱歉，您访问的页面可能已被删除、移动或输入了错误的网址。
      </p>
      <div class="not-found-actions">
        <router-link to="/" class="btn btn-primary"> 返回首页 </router-link>
        <button class="btn btn-secondary" @click="goBack">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    methods: {
      goBack() {
        window.history.back()
      }
    }
  }
</script>

<style scoped>
  .not-found-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    padding: 20px;
  }

  .not-found-content {
    text-align: center;
    max-width: 600px;
    width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 40px 20px;
  }

  .not-found-icon {
    margin-bottom: 30px;
    position: relative;
    display: inline-block;
  }

  .icon-404 {
    font-size: 100px;
    font-weight: 900;
    color: #3498db;
    position: relative;
    display: inline-block;
    line-height: 1;
    text-shadow: 2px 2px 0 rgba(52, 152, 219, 0.2);
    animation: pulse 2s infinite;
  }

  .icon-404::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
    animation: rotate 8s linear infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .not-found-subtitle {
    font-size: 28px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 20px 0;
  }

  .not-found-description {
    font-size: 16px;
    color: #7f8c8d;
    margin: 0 0 30px 0;
    line-height: 1.5;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .not-found-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  .btn-primary::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  .btn-primary:hover::after {
    animation: ripple 1s ease-out;
  }

  .btn-secondary {
    background-color: white;
    color: #3498db;
    border: 1px solid #3498db;
  }

  .btn-secondary:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .not-found-content {
      padding: 30px 15px;
    }

    .icon-404 {
      font-size: 80px;
    }

    .not-found-subtitle {
      font-size: 24px;
    }

    .not-found-description {
      font-size: 14px;
    }

    .not-found-actions {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 200px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .icon-404 {
      font-size: 60px;
    }

    .not-found-subtitle {
      font-size: 20px;
    }

    .icon-404::before {
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
    }
  }
</style>
