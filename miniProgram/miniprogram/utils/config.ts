import { GlobalData } from 'miniprogram/interfaceType/common'

const globalData = getApp().globalData as GlobalData
const url = {
	local: 'http://localhost:8888/forher',
	test: 'https://zhangtaoo.cn/forher',
	prod: 'https://zhangtaoo.cn/forher',
}
/**
 * 接口：https://zhangtaoo.cn/wlhh
 */
export const baseUrl = url[globalData.appEnv]
