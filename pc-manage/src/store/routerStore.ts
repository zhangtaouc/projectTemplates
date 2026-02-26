import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

/**
 * 公共状态管理
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */

export const useRouterStore = defineStore('store', () => {
  const pageList = ref([
    {
      path: '/home',
      icon: 'miniprogram-icon',
      meta: {
        title: '小程序列表'
      }
    },
    {
      path: '/',
      icon: 'miniprogram-icon',
      meta: {
        title: '用户管理',
        affix: true
      },
      children: [
        {
          meta: {
            title: '用户列表1',
            affix: true
          },
          path: 'visitPage'
        },
        {
          meta: {
            title: '用户列表2',
            affix: true
          },
          path: 'test2'
        }
      ]
    },
    {
      icon: 'miniprogram-icon',
      meta: {
        title: '任务管理',
        affix: true
      },
      path: '/test1'
    }
  ])

  return {
    pageList
  }
})
