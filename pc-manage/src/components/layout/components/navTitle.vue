<template>
  <div class="navTitle">
    {{ navTitle }}
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const navTitle = ref()
  watch(route, () => {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    navTitle.value = route.meta.title
  })
  onMounted(() => {
    navTitle.value = route.meta.title
  })
</script>

<style lang="less">
  .navTitle {
    display: flex;
    width: 100%;
    height: 2.222vw;
    line-height: 2.222vw;
    margin-top: 1.389vw;
    margin-bottom: 1.389vw;
    padding-left: 1.667vw;
    font-size: 1.667vw;
    // color: #3a3f63;
    color: var(--main-color);
    font-weight: bold;
  }
</style>
