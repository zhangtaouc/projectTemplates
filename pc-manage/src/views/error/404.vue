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

<style scoped lang="less">
  .not-found-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    padding: 20px;
    box-sizing: border-box;

    .not-found-content {
      text-align: center;
      max-width: 600px;
      width: 100%;
      background-color: var(--white-color);
      border-radius: var(--border-radius-12);
      box-shadow: 0 10px 30px var(--black-color-20);
      padding: 40px 20px;

      .not-found-icon {
        margin-bottom: 30px;
        position: relative;
        display: inline-block;

        .icon-404 {
          font-size: 100px;
          font-weight: 900;
          color: var(--main-color);
          position: relative;
          display: inline-block;
          line-height: 1;
          text-shadow: 2px 2px 0 var(--light-yellow-shadow);
          animation: pulse 2s infinite;

          &::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: linear-gradient(
              45deg,
              var(--main-color),
              var(--light-yellow-color)
            );
            border-radius: 50%;
            opacity: 0.1;
            z-index: -1;
            animation: rotate 8s linear infinite;
          }
        }
      }

      .not-found-subtitle {
        font-size: 28px;
        font-weight: 600;
        color: var(--black-color);
        margin: 0 0 20px 0;
      }

      .not-found-description {
        font-size: var(--font-size-16);
        color: var(--gray-color);
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

        .btn {
          padding: 12px 24px;
          border-radius: 6px;
          font-size: var(--font-size-16);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;

          &.btn-primary {
            background-color: var(--main-color);
            color: var(--white-color);
            border: none;

            &:hover {
              background-color: var(--main-color);
              transform: translateY(-2px);
              box-shadow: 0 4px 12px var(--light-yellow-shadow);

              &::after {
                animation: ripple 1s ease-out;
              }
            }

            &::after {
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
          }

          &.btn-secondary {
            background-color: var(--white-color);
            color: var(--main-color);
            border: 1px solid var(--main-color);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px var(--light-yellow-shadow);
            }
          }
        }
      }
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .not-found-content {
        padding: 30px 15px;

        .icon-404 {
          font-size: 80px;
        }

        .not-found-subtitle {
          font-size: 24px;
        }

        .not-found-description {
          font-size: var(--font-size-14);
        }

        .not-found-actions {
          flex-direction: column;
          align-items: center;

          .btn {
            width: 100%;
            max-width: 200px;
            text-align: center;
          }
        }
      }
    }

    @media (max-width: 480px) {
      .not-found-content {
        .icon-404 {
          font-size: 60px;

          &::before {
            top: -15px;
            left: -15px;
            right: -15px;
            bottom: -15px;
          }
        }

        .not-found-subtitle {
          font-size: 20px;
        }
      }
    }
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
</style>
