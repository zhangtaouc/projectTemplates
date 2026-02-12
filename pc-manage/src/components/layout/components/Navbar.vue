<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-collapse="useStore().isCollapse"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb />

    <div class="right-menu">
      <div class="user-name">张涛</div>
      <div class="avatar-container">
        <el-dropdown
          class="right-menu-item hover-effect"
          trigger="click"
          @command="handleCommand"
        >
          <div class="avatar-wrapper">
            <img src="@/assets/images/avatar.svg" class="user-avatar" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="logout">
                <span>登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Hamburger from '../components/Hamburger/index.vue'
  import Breadcrumb from '../components/Breadcrumb/index.vue'
  import { useStore } from '@/store'
  function toggleSideBar() {
    useStore().isCollapse = !useStore().isCollapse
  }

  function handleCommand(command: any) {
    switch (command) {
      case 'logout':
        logout()
        break
      default:
        break
    }
  }

  function logout() {}
</script>

<style lang="less" scoped>
  .navbar {
    height: var(--navbar-height);
    overflow: hidden;
    position: relative;
    background: var(--white-color);
    position: relative;

    .right-menu {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      line-height: 50px;
      display: flex;
      align-items: center;

      &:focus {
        outline: none;
      }
      .user-name {
        font-size: 15px;
        color: var(--black-color);
        margin-right: 10px;
        cursor: pointer;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: var(--gray-color);
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: var(--black-color-20);
          }
        }
      }

      .avatar-container {
        margin-right: 16px;
        display: flex;
        align-items: center;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 32px;
            border-radius: 50%;
          }

          i {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
  // 下拉框颜色
  :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    background: var(--white-color);
  }
</style>
