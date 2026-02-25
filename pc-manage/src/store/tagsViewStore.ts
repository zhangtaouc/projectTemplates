import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  RouteLocationNormalizedLoadedGeneric,
  RouteRecordName
} from 'vue-router'

/**
 * 公共状态管理
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */

export const tagsViewStore = defineStore('tagsView', () => {
  // 存储已访问的视图列表
  const visitedViews = ref<RouteLocationNormalizedLoadedGeneric[]>([])
  // 存储需要缓存的视图名称列表
  const cacheViews = ref<RouteRecordName[]>([])
  // 添加视图到已访问视图列表和缓存视图列表中
  const addView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const exits = visitedViews.value.some(v => v.path === view.path)
    addCacheView(view) // 重新添加缓存视图以防止缓存被清除
    if (exits) return
    const newView = {
      ...view,
      title: view.meta.title // 设置页签标题
    }
    visitedViews.value.push(newView)
  }
  // 从已访问视图列表和缓存视图列表中删除指定视图
  const deleteView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
    deleteCacheView(view)
  }

  // 添加视图名称到缓存视图列表中，除非视图不需要缓存
  const addCacheView = (view: RouteLocationNormalizedLoadedGeneric) => {
    if (cacheViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cacheViews.value.push(view.name)
    }
  }

  // 从缓存视图列表中删除指定视图名称
  const deleteCacheView = (view: RouteLocationNormalizedLoadedGeneric) => {
    const index = cacheViews.value.indexOf(view.name)
    if (index > -1) {
      cacheViews.value.splice(index, 1)
    }
  }

  // 删除所有非固定视图，并清空缓存视图列表
  const delAllView = () => {
    visitedViews.value = visitedViews.value.filter(view => view.meta.affix)
    cacheViews.value = []
  }

  // 删除除指定视图外的所有视图，并保留指定视图的缓存
  const deleteOtherView = (view: RouteLocationNormalizedLoadedGeneric) => {
    visitedViews.value = visitedViews.value.filter(
      v => v.meta.affix || v.path === view.path
    )
    cacheViews.value = cacheViews.value.filter(name => name === view.name)
  }

  return {
    visitedViews,
    cacheViews,
    addView,
    deleteView,
    delAllView,
    deleteOtherView,
    deleteCacheView
  }
})
