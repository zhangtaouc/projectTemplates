import { showDialog, showToast } from 'vant'
/**
 * 显示提示
 * @param message 提示内容
 * @param duration 显示时间
 */
export function ShowToast(message: string) {
  showToast({
    message
  })
}

/**
 * 显示弹窗
 * @param title 弹窗标题
 * @param message 弹窗内容
 * @param confirmButtonText 确认按钮文本
 * @param cancelButtonText 取消按钮文本
 * @param showCancelButton 是否显示取消按钮
 * @param confirmButtonColor 确认按钮颜色
 */
export function ShowDialog(
  title: string,
  message: string,
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  showCancelButton = true,
  confirmButtonColor = '#var(--main-color)'
) {
  return showDialog({
    title,
    message,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor
  })
}
