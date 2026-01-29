import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 公共状态管理
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */
export const useStore = defineStore('common', () => {
  const isLogin = ref(false)
  const isCollapse = ref(false)
  // token
  const token = ref('')
  const nickName = ref('')
  // 是否展示访问按钮
  const isSHowVisitBtn = ref(false)
  return { isLogin, isCollapse, isSHowVisitBtn, token, nickName }
})
