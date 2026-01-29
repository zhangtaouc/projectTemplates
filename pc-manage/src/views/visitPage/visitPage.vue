<template>
  <div class="main-page">
    <div class="page-bg">
      <img
        src="@/assets/images/visitPage/home-bg-icon.png"
        class="home-bg-icon"
      />
      <img
        src="@/assets/images/visitPage/name-icon-extra.svg"
        class="name-icon"
        v-if="visitType === 'extra'"
      />
      <img
        src="@/assets/images/visitPage/name-icon.svg"
        class="name-icon"
        v-else
      />
    </div>
    <div class="content-container">
      <div class="form-container">
        <div
          class="form-item"
          v-for="item in enterpriseFormList"
          :key="item.name"
        >
          <div class="validation-message" v-if="item.isError">
            {{ item.errorMessage }}
          </div>
          <div class="form-item-label" :class="{ required: item.required }">
            {{ item.name }}
          </div>
          <input
            type="text"
            :placeholder="item.placeholder"
            class="form-item-input"
            v-model="item.showValue"
            :readonly="item.isSelectOpaction || item.isReadOnly"
            @click="handleInput(item)"
          />
        </div>
        <!-- 特色行业标签 -->
        <div class="form-item">
          <div class="validation-message" v-if="specialIndustryTag.isError">
            {{ specialIndustryTag.errorMessage }}
          </div>
          <div
            class="form-item-label"
            :class="{ required: specialIndustryTag.required }"
          >
            {{ specialIndustryTag.name }}
          </div>
          <input
            type="text"
            :placeholder="specialIndustryTag.placeholder"
            class="form-item-input"
            v-model="specialIndustryTag.showValue"
            :readonly="
              specialIndustryTag.isSelectOpaction ||
              specialIndustryTag.isReadOnly
            "
            @click="handleInput(specialIndustryTag)"
          />
        </div>
        <!-- 特色行业标签 -->
        <div class="form-item" v-if="specialIndustryTag.value === 'other'">
          <div class="validation-message" v-if="tagName.isError">
            {{ tagName.errorMessage }}
          </div>
          <div class="form-item-label" :class="{ required: tagName.required }">
            {{ tagName.name }}
          </div>
          <input
            type="text"
            :placeholder="tagName.placeholder"
            class="form-item-input"
            v-model="tagName.value"
            :readonly="tagName.isReadOnly"
            @click="handleInput(tagName)"
          />
        </div>
        <!-- 其他业务需求 -->
        <div class="form-item">
          <div class="validation-message" v-if="otherRequirements.isError">
            {{ otherRequirements.errorMessage }}
          </div>
          <div
            class="form-item-label"
            :class="{ required: otherRequirements.required }"
          >
            {{ otherRequirements.name }}
          </div>
          <input
            type="text"
            :placeholder="otherRequirements.placeholder"
            class="form-item-input"
            v-model="otherRequirements.showValue"
            :readonly="
              otherRequirements.isReadOnly || otherRequirements.isSelectOpaction
            "
            @click="handleInput(otherRequirements)"
          />
        </div>
        <!-- 其他业务需求备注 -->
        <div class="form-item" v-if="otherRequirements.value === 'other'">
          <div
            class="validation-message"
            v-if="otherRequirementsRemake.isError"
          >
            {{ otherRequirementsRemake.errorMessage }}
          </div>
          <div
            class="form-item-label"
            :class="{ required: otherRequirementsRemake.required }"
          >
            {{ otherRequirementsRemake.name }}
          </div>
          <input
            type="text"
            :placeholder="otherRequirementsRemake.placeholder"
            class="form-item-input"
            v-model="otherRequirementsRemake.value"
            :readonly="otherRequirementsRemake.isReadOnly"
            @click="handleInput(otherRequirementsRemake)"
          />
        </div>
      </div>
    </div>
    <div
      class="submit-button"
      @click="handleSubmit"
      v-if="isShowSubmit && isSHowVisitBtn && !isVisited"
    >
      提交
    </div>
    <div
      class="submit-button"
      @click="getRegisterQrcode"
      v-if="
        !isShowSubmit || isVisited || (!isSHowVisitBtn && registRxfStatus === 0)
      "
    >
      查看融信服注册码
    </div>
  </div>
  <van-popup
    v-model:show="pickerObj.showPicker"
    destroy-on-close
    round
    position="bottom"
  >
    <van-picker
      :columns="pickerObj.columns"
      @cancel="pickerObj.showPicker = false"
      @confirm="pickerOnConfirm"
      :title="pickerObj.title"
    />
  </van-popup>
  <show-image
    tips="扫描上方二维码注册融信服平台"
    :image-url="registerQrcode"
    @showControl="controlRegisterQrcode"
    v-if="isShowRegisterQrcode"
  />
  <Loading v-if="isLoading" />
</template>
<script lang="ts" src="./visitPage.ts" />
<style lang="less" src="./visitPage.less" />
