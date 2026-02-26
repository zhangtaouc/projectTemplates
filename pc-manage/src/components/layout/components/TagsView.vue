//src/layout/components/TagsView/index.vue
<template>
  <div class="tags-view-container">
    <el-scrollbar>
      <router-link
        class="tags-view-item"
        v-for="(tag, index) in visitedViews"
        :class="{
          active: isActive(tag)
        }"
        :key="index"
        :to="{ path: tag.path, query: tag.query }"
      >
        <el-dropdown
          placement="top-start"
          trigger="contextmenu"
          @command="command => handleCommand(command, tag)"
        >
          <span class="title">{{ (tag as any).title }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item command="all">关闭所有</el-dropdown-item> -->
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item
                command="self"
                v-if="!tag.meta.affix && visitedViews.length > 1"
                >关闭</el-dropdown-item
              >
              <el-dropdown-item command="refresh">刷新</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <img
          src="@/assets/images/delete-icon.svg"
          class="delete-icon"
          @click.prevent="closeSelectedTag(tag)"
          v-if="visitedViews.length > 1"
        />
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import {
    useRoute,
    useRouter,
    type RouteLocationNormalizedGeneric,
    type RouteRecordRaw
  } from 'vue-router'
  import { routes } from '@/router/index'
  import { tagsViewStore } from '@/store/tagsViewStore'
  import { storeToRefs } from 'pinia'
  import { join } from 'path-browserify'
  import { onMounted } from 'vue'
  import { watch } from 'vue'
  const store = tagsViewStore()
  const { deleteView, addView, delAllView, deleteOtherView, deleteCacheView } =
    store
  //  必须采用storeToRefs 进行解构出来，否则会丧失响应式
  const { visitedViews } = storeToRefs(store)

  /*
  useRouter 创建了一个 router 实例，该实例用于程序化的导航。
  useRouter 是 Vue Router 提供的组合式 API，用于在组件中操作路由。
  有了 router 实例，组件可以调用 router.push、router.replace 等方法来导航到不同的页面或视图。
  */
  const router = useRouter()
  /*
  useRoute 创建了一个 route 实例，该实例包含了当前路由的信息。
  useRoute 是 Vue Router 提供的组合式 API，用于在组件中获取当前路由的详细信息。
  route 对象包含了当前路由的路径、名称、查询参数等信息，组件可以利用这些信息来判断当前活动的标签页、或者执行一些路由相关的逻辑操作。
  */
  const route = useRoute()

  // 判断当前路由是否激活状态
  const isActive = (tag: RouteLocationNormalizedGeneric) => {
    return tag.path === route.path
  }

  // 判断标签是否为可关闭状态
  function isAffix(tag: RouteLocationNormalizedGeneric) {
    return tag.meta.affix
  }

  // 添加当前路由到标签视图
  const addTags = () => {
    if (route.name) {
      // 需要添加到tags中
      addView(route)
    }
  }

  // 导航到最后一个标签视图
  const toLastView = () => {
    const lastView = visitedViews.value[visitedViews.value.length - 1]
    if (lastView) {
      router.push(lastView.path)
    } else {
      router.push('/')
    }
  }

  // 关闭选中的标签视图
  const closeSelectedTag = (tag: RouteLocationNormalizedGeneric) => {
    console.log(tag)
    deleteView(tag)

    if (isActive(tag)) {
      // 如果删掉了自己，需要导航到当前list中的最后一个
      toLastView()
    }
  }

  //  此方法用于计算 哪些tag应该默认展示在列表中
  function filterAffix(routes: RouteRecordRaw[], basePath = '/') {
    const tags: RouteLocationNormalizedGeneric[] = []
    for (let route of routes) {
      if (route?.meta?.affix) {
        tags.push({
          name: route.name,
          path: join(basePath, route.path),
          meta: route.meta
        } as RouteLocationNormalizedGeneric)
      }
      if (route.children) {
        tags.push(...filterAffix(route.children, route.path))
      }
    }

    return tags
  }

  // 初始化标签视图，添加固定标签和当前路由标签
  const initTags = () => {
    const filterAffixTags = filterAffix(routes)
    filterAffixTags.forEach(tag => {
      //添加固定标签
      addView(tag)
    })
    //添加当前路由标签
    addTags()
  }

  // 页面加载后 需要初始化固定 + 默认当前路径的
  onMounted(() => {
    initTags()
  })

  //  路径变化时重新添加
  watch(() => route.path, addTags)

  // 点击菜单
  const CommandType = {
    All: 'all',
    Other: 'other',
    Self: 'self',
    Refresh: 'refresh'
  }

  // 处理菜单命令
  const handleCommand = (
    command: keyof typeof CommandType | any,
    view: RouteLocationNormalizedGeneric
  ) => {
    switch (command) {
      case CommandType.All:
        delAllView()
        break
      case CommandType.Other:
        deleteOtherView(view)
        if (!isActive(view)) {
          router.push(view.path)
        }
        break
      case CommandType.Self:
        closeSelectedTag(view)
        break
      case CommandType.Refresh:
        // 如果本次路径和上次路径相同，刷新会没有效果
        // 解决方法：跳转到专门做刷新的一个路由，在通过这个路由回来即可
        deleteCacheView(view)

        router.push('/redirect' + view.path)
        break
    }
  }
</script>

<style scoped lang="less">
  .tags-view-container {
    border-bottom: 1px solid var(--common-border-color);
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    .tags-view-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: var(--tag-view-item-height);
      padding: 0 12px;
      margin-right: 12px;
      border-radius: 4px;
      background-color: var(--white-color);
      border: 1px solid var(--common-border-color);
      border-bottom: none;
      color: var(--black-color-80);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      white-space: nowrap;
      .delete-icon {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 14px;
        height: 14px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        background-color: var(--white-color);
        border-radius: 50%;
        padding: 2px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }

      &:hover {
        .delete-icon {
          opacity: 1;
        }
      }
      &:hover {
        background-color: var(--light-yellow-color);
        border-color: var(--light-yellow-color);
        .title {
          color: var(--white-color) !important;
        }
        svg {
          opacity: 1;
        }
      }

      &.active {
        background-color: var(--light-yellow-color);
        border-color: var(--light-yellow-color);
        color: var(--white-color);

        .title {
          color: var(--white-color);
        }

        &:hover {
          background-color: var(--light-yellow-color);
          border-color: var(--light-yellow-color);
          color: var(--black-color-80);

          .title {
            color: var(--black-color-80);
          }
        }

        svg {
          fill: var(--white-color);
          opacity: 0.9;
        }
      }

      svg {
        width: 14px;
        height: 14px;
        opacity: 0.7;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      }
    }
  }

  .title {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 滚动条样式 */
  :deep(.el-scrollbar__wrap) {
    // height: 40px;
    white-space: nowrap;
  }

  :deep(.el-scrollbar__thumb) {
    display: none;

    &:hover {
      background-color: var(--main-color);
    }
  }
</style>
