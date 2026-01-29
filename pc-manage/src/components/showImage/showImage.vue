<template>
  <van-overlay z-index="999" :show="show" @click="showControl">
    <div class="wrapper">
      <img :src="imageUrl" alt="" class="show-image" />
      <div class="tips" v-if="tips">{{ tips }}</div>
    </div>
  </van-overlay>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  defineProps({
    imageUrl: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['showControl'])
  const show = ref(true)

  function showControl() {
    emit('showControl', show.value)
  }
</script>
<style scoped lang="less">
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .show-image {
      width: 260px;
      height: 260px;
    }
    .tips {
      font-size: var(--font-size-16);
      // font-weight: bold;
      color: var(--white-color);
      margin-top: 30px;
    }
  }
</style>
