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
      display: flex;
      align-items: center;
      padding: 0 20px;

      &:focus {
        outline: none;
      }

      .user-name {
        font-size: var(--font-size-14);
        color: var(--black-color-80);
        margin-right: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: var(--main-color);
        }
      }

      .avatar-container {
        display: flex;
        align-items: center;

        .right-menu-item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 12px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .avatar-wrapper {
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid var(--light-yellow-color);
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.05);
              box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
            }
          }
        }
      }
    }

    // 移动端适配
    @media (max-width: 768px) {
      .right-menu {
        padding: 0 12px;

        .user-name {
          display: none;
        }

        .avatar-container {
          .avatar-wrapper {
            .user-avatar {
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
  }
</style>
