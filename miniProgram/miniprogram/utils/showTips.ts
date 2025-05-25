import Notify from '@vant/weapp/notify/notify'
import Toast from '@vant/weapp/toast/toast'
import { ToastType } from '../interfaceType/common'

/**
 * 成功提示
 * @param message
 * @param timeout
 */
export function NoticeWarn(message: string, timeout = 0) {
	setTimeout(() => {
		Notify({ type: 'warning', message: message })
	}, timeout)
}

/**
 * 成功提示
 * @param message
 * @param timeout
 */
export function NoticeSuccess(message: string, timeout = 0) {
	setTimeout(() => {
		Notify({ type: 'success', message: message })
	}, timeout)
}

/**
 * 错误提示
 * @param message
 * @param timeout
 */
export function NoticeError(message: string, timeout = 0) {
	setTimeout(() => {
		Notify({ type: 'danger', message: message })
	}, timeout)
}

/**
 * toast
 * @param message
 * @param type
 * @param duration
 */
export const ShowToast = (message: string, type: ToastType = 'text', duration = 3000) => {
	Toast(message)
}
