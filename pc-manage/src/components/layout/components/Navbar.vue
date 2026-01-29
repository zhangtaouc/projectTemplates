<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="true"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb
      v-if="false"
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <el-dropdown trigger="click">
        <img src="../../assets/images/language-icon.svg" class="change-lang" />
        <template #dropdown>
          <el-dropdown-menu> </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="user-name">张涛</div>
      <div class="avatar-container">
        <el-dropdown
          class="right-menu-item hover-effect"
          trigger="click"
          @command="handleCommand"
        >
          <div class="avatar-wrapper">
            <img
              src="../../assets/images/login/avatar.png"
              class="user-avatar"
            />
            <el-icon><caret-bottom /></el-icon>
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
    height: 80px;
    overflow: hidden;
    position: relative;
    background: #fafafa;
    .hamburger-container {
      display: flex !important;
      align-items: center !important;
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      height: 100%;
      display: flex;
      align-items: center;
      float: left;
    }

    .topmenu-container {
      position: absolute;
      left: 50px;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      display: flex;
      align-items: center;

      &:focus {
        outline: none;
      }
      .env {
        font-size: 15px;
        color: var(--main-color);
        margin-right: 10px;
        cursor: pointer;
        font-weight: bold;
      }
      .user-name {
        font-size: 15px;
        color: #000;
        margin-right: 10px;
        cursor: pointer;
      }
      .change-lang {
        width: 32px;
        height: 32px;
        margin-right: 15px;
        cursor: pointer;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 40px;
        display: flex;
        align-items: center;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50px;
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
    :deep(.el-dialog__title) {
      font-size: 16px;
      // font-weight: 550;
      font-weight: block;
      color: #3a4366;
    }
    .el-form-item {
      margin-bottom: 24px !important;
      &.el-form-item__label {
        font-size: 16px;
      }
    }
    :deep(.el-dialog__body) {
      padding: 14px 32px 32px 32px;
    }
  }
  .el-dropdown-menu .edite-password {
    font-size: 14px;
    // font-weight: 400;
    font-weight: normal;
    color: #000;
    text-align: center;
    cursor: pointer;
    padding: 5px 16px;
    &:hover {
      background-color: #ecf5ff;
      color: #66b1ff;
    }
  }
  // 下拉框颜色
  :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    background: #fff;
  }
</style>
