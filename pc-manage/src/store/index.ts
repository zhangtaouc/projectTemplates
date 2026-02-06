import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

/**
 * 公共状态管理
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */
export type deviceType = 'pc' | 'mobile' | 'tablet'
export const useStore = defineStore('common', () => {
  const isLogin = ref(false)
  const isCollapse = ref(false)
  // token
  const token = ref('')
  const nickName = ref('')
  // 是否展示访问按钮
  const isSHowVisitBtn = ref(false)
  const deviceType: Ref<deviceType> = ref('pc')

  /**
   * 设置设备类型
   * @param pixel 窗口宽度
   */
  function setDeviceType(pixel: number) {
    // 手机
    if (pixel < 576) {
      deviceType.value = 'mobile'
    } else if (pixel < 992) {
      // 平板
      deviceType.value = 'tablet'
    } else {
      // 桌面
      deviceType.value = 'pc'
    }
  }
  return {
    isLogin,
    isCollapse,
    isSHowVisitBtn,
    token,
    nickName,
    deviceType,
    setDeviceType
  }
})
