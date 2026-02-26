<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-copyright">© 2026 管理系统. 保留所有权利</div>
      <div class="footer-beian">
        <a
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          鲁ICP备2024081581号-3
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  // Footer component
</script>

<style scoped lang="less">
  .footer {
    height: var(--footer-height);
    background-color: var(--white-color);
    border-top: 1px solid var(--common-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;

    .footer-content {
      text-align: center;

      .footer-copyright {
        color: var(--black-color-60);
        font-size: var(--font-size-12);
        margin-bottom: 8px;
      }

      .footer-beian {
        .beian-link {
          color: var(--black-color-60);
          font-size: var(--font-size-12);
          text-decoration: none;

          &:hover {
            color: var(--main-color);
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
