<template>
  <h2>{{ title }}</h2>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('webpack5-vue3-ts')
</script>
<style scoped lang="less">
h2 {
  color: red;
}
</style>
