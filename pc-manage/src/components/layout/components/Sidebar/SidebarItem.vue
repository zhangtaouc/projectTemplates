<template>
  <template
    v-if="
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow
    "
  >
    <app-link
      v-if="onlyOneChild.meta"
      :to="resolvePath(onlyOneChild.path, onlyOneChild.query)"
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path, '')"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <img :src="getIcon(item.icon)" class="menu-icon" v-if="item.icon" />
        <template #title>
          <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{
            onlyOneChild.meta.title
          }}</span>
        </template>
      </el-menu-item>
    </app-link>
  </template>

  <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path, '')">
    <template v-if="item.meta" #title>
      <div class="selectMenu" />
      <img :src="getIcon(item.icon)" class="menu-icon" v-if="item.icon" />
      <span class="menu-title" :title="hasTitle(item.meta.title)">{{
        item.meta.title
      }}</span>
    </template>

    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path, '') as string"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
  import { type Ref, ref } from 'vue'

  import AppLink from './Link.vue'
  import { isExternal } from '@/utils/validate'
  import { getNormalPath } from '@/utils/ruoyi'

  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  })

  interface onlyOneChildInterface {
    children: Array<string>
    meta: {
      title: string
    }
    noShowingChildren: Array<string>
    path: string
    query: string
    hidden: boolean
  }

  const onlyOneChild: Ref<onlyOneChildInterface> = ref({
    children: [],
    meta: {
      title: ''
    },
    noShowingChildren: [],
    path: '',
    query: '',
    hidden: false
  })

  function hasOneShowingChild(children = [], parent: any) {
    if (!children) {
      children = []
    }
    const showingChildren = children.filter((item: any) => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  function resolvePath(routePath: string, routeQuery: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    if (routeQuery) {
      const query = JSON.parse(routeQuery)
      return { path: getNormalPath(`${props.basePath}/${routePath}`), query }
    }
    return getNormalPath(`${props.basePath}/${routePath}`)
  }

  function hasTitle(title: string) {
    if (title.length > 5) {
      return title
    } else {
      return ''
    }
  }

  function getIcon(icon: string) {
    return new URL(
      `../../../../assets/images/home/${icon}.svg`,
      import.meta.url
    ).href
  }
</script>
<style lang="less" scoped>
  .menu-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
</style>
