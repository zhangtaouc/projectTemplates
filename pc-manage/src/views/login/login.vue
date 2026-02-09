<template>
  <div class="main-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo-container">
          <img src="../../assets/images/logo.svg" alt="logo" />
        </div>
        <div class="login-title">欢迎登录农信社昆明市联社！</div>
        <p class="login-subtitle">弓长水寿科技</p>
      </div>

      <form class="login-form">
        <div class="form-group">
          <div class="validation-message" v-if="formErrorMsg.username">
            {{ formErrorMsg.username }}
          </div>
          <div class="input-with-icon">
            <img src="../../assets/login/account-icon.svg" class="input-icon" />
            <input
              type="text"
              id="username"
              class="form-control"
              placeholder="请输入您的用户名"
              v-model="loginForm.username"
              autocomplete="username"
              @keydown.enter="handleLogin"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="validation-message" v-if="formErrorMsg.password">
            {{ formErrorMsg.password }}
          </div>
          <div class="input-with-icon">
            <img
              src="../../assets/login/password-icon.svg"
              class="input-icon"
            />
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              id="password"
              class="form-control"
              placeholder="请输入您的密码"
              v-model="loginForm.password"
              autocomplete="current-password"
              @keydown.enter="handleLogin"
            />
            <img
              :src="getPasswordIcon"
              class="toggle-password-icon"
              @click="togglePasswordVisibility"
              alt="显示/隐藏密码"
              title="显示/隐藏密码"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="validation-message" v-if="formErrorMsg.verificationCode">
            {{ formErrorMsg.verificationCode }}
          </div>
          <div class="input-with-icon">
            <img
              src="../../assets/login/verification-icon.svg"
              class="input-icon"
            />
            <input
              type="text"
              id="verificationCode"
              class="form-control"
              placeholder="请输入验证码"
              v-model="loginForm.verificationCode"
              autocomplete="current-verificationCode"
              @keydown.enter="handleLogin"
            />
            <img
              :src="verificationCodeImg"
              class="verification-code-img"
              @click="getCaptcha"
            />
          </div>
        </div>

        <div
          @click="handleLogin"
          class="btn-login"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">立即登录</span>
          <div v-else class="loading-spinner">
            <div class="spinner" />
            <span class="loading-text">登录中...</span>
          </div>
        </div>
      </form>

      <footer class="footer">
        <div class="footer-content">
          <p class="copyright">
            © 2026 云南省融资信用征信服务有限公司 版权所有
          </p>
          <p class="icp-info">
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              滇ICP备19005596号-7
            </a>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
<script lang="ts" src="./login.ts" />
<style lang="less" scoped>
  @import './login.less';
</style>
