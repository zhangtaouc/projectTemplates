<template>
  <div class="main-page">
    <div class="page-bg">
      <!-- 用户名显示 -->
      <div class="user-info" v-if="nickName" @click="loginOut">
        {{ nickName }}
      </div>
      <img src="@/assets/images/home/home-bg-icon.png" class="home-bg-icon" />
      <img src="@/assets/images/home/name-icon.svg" class="name-icon" />
    </div>
    <div class="header" v-if="false">
      <van-nav-bar title="首页">
        <template #left>
          <img src="@/assets/images/home/back-icon.svg" class="back-icon" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content-container">
      <div class="common-title">
        <div class="block" />
        <div class="title">条件筛选</div>
      </div>
      <div class="filter-container">
        <input
          type="text"
          class="search-input"
          placeholder="企业名称"
          v-model="getOrderListParams.companyName"
        />
        <input
          type="text"
          class="search-input"
          placeholder="名单批次"
          v-model="getOrderListParams.batchName"
        />

        <div class="search-button" @click="initPage">
          <van-button color="var(--search-button-bg)"
            ><img
              src="@/assets/images/home/search-icon.svg"
              class="search-icon"
          /></van-button>
        </div>
      </div>
      <div class="filter-container">
        <input
          type="text"
          class="search-input"
          placeholder="是否已走访"
          v-model="getOrderListParams.visitStatusText"
          readonly
          @click="controlPicker('isVisited')"
        />
        <input
          type="text"
          class="search-input"
          placeholder="是否注册"
          v-model="getOrderListParams.registRxfStatusText"
          readonly
          @click="controlPicker('registered')"
        />
        <div class="search-button" @click="reset">
          <van-button color="var(--search-button-bg)">
            <img
              src="@/assets/images/home/reset-icon.svg"
              class="search-icon"
            />
          </van-button>
        </div>
      </div>
      <div class="common-title">
        <div class="block" />
        <div class="title">走访统计</div>
      </div>
      <div class="visit-statistics">
        <div class="item">
          <div class="label">已走访</div>
          <div class="value">{{ statistics.visit }}<span>个</span></div>
          <img
            src="@/assets/images/home/num-sub-bg-1.webp"
            class="num-sub-bg"
          />
        </div>
        <div class="item">
          <div class="label">未走访</div>
          <div class="value">{{ statistics.unvisit }}<span>个</span></div>
          <img
            src="@/assets/images/home/num-sub-bg-2.webp"
            class="num-sub-bg num-sub-bg-2"
          />
        </div>
      </div>
      <!-- 名单外企业走访按钮 -->
      <button
        class="outside-enterprise-button"
        v-if="isSHowVisitBtn"
        @click="goVisitPage()"
      >
        <span>名单外企业走访</span>
        <img src="@/assets/images/home/arrow-icon.svg" class="arrow-icon" />
      </button>
      <div class="common-title-container" v-if="false">
        <div class="common-title" style="padding-bottom: 0">
          <div class="block" />
          <div class="title">任务列表</div>
        </div>
        <div class="arrow-container">
          <span>名单外企业走访</span>
          <img src="@/assets/images/home/arrow-icon.svg" class="arrow-icon" />
        </div>
      </div>
      <div class="common-title">
        <div class="block" />
        <div class="title">任务列表</div>
      </div>

      <div class="task-list" v-if="taskList.length > 0">
        <div
          class="task-item"
          @click="goVisitPage(task.id)"
          v-for="task in taskList"
          :key="task.id"
        >
          <img
            src="@/assets/images/content-sub-bg.svg"
            class="content-sub-bg"
            v-if="!task.isVisited"
          />
          <div class="task-info">
            <div class="task-company">
              {{ task.companyName }}
            </div>
            <div class="task-batch">
              {{ task.batchName }}
            </div>
            <!-- 是否注册 -->
            <div class="task-registered">
              <div
                class="register-status"
                :class="{
                  registered: task.isRegistered,
                  unregistered: !task.isRegistered
                }"
              >
                <i class="status-dot"></i>
                {{ task.isRegistered ? '已注册' : '未注册' }}
              </div>
            </div>
          </div>
          <button
            class="task-action-button"
            :class="{
              visited: task.isVisited,
              disabled: !isSHowVisitBtn && !task.isVisited
            }"
            v-if="!task.isVisited || (task.isRegistered && task.isVisited)"
          >
            {{ task.isVisited ? '已走访' : '去走访' }}
          </button>
          <img
            @click.stop="getRegisterQrcode(task.id)"
            src="@/assets/images/home/ER-code-icon.png"
            class="er-icon"
            v-else
          />
          <div class="visit-status" v-if="task.isVisited && !task.isRegistered">
            <span v-if="task.visitObject">{{ task.visitObject }}-</span>已走访
          </div>
        </div>
        <van-pagination
          v-model="getOrderListParams.page"
          :total-items="getOrderListParams.total"
          :items-per-page="getOrderListParams.limit"
          mode="simple"
          @change="handlePageChange"
        />
      </div>
      <div class="no-data" v-else>
        <van-skeleton v-if="!isLoadedData" :row="6" />
        <span v-else>暂无数据</span>
      </div>
    </div>
    <div class="page-bottom-block" />
  </div>
  <show-image
    tips="扫描上方二维码注册融信服平台"
    :image-url="registerQrcode"
    @showControl="controlRegisterQrcode"
    v-if="isShowRegisterQrcode"
  />
  <van-popup
    v-model:show="picker.isShow"
    destroy-on-close
    round
    position="bottom"
  >
    <van-picker
      :model-value="picker.value"
      :columns="picker.columns"
      @cancel="picker.isShow = false"
      @confirm="onConfirm"
      :title="picker.title"
    />
  </van-popup>
</template>
<script lang="ts" src="./home.ts" />
<style lang="less" scoped src="./home.less" />
