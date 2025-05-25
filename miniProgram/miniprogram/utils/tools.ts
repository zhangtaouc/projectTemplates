import { GlobalData } from 'miniprogram/interfaceType/common'
import { getUserInfoApi } from './api'
const globalData = getApp<IAppOption>().globalData as GlobalData

/**
 * 时间格式化
 * @param date
 */
export const formatTime = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	const time = {
		year,
		month,
		day,
		hour,
		minute,
		second,
		fullTime: [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':'),
	}
	return time
}

/**
 * 获取时间差
 * @param startTime
 * @param endTime
 */
export function intervalTime(startTime: number, endTime: number) {
	// 这里取绝对值 保证结果为正
	let _timeInterval = Math.abs(endTime - startTime)
	let day = Math.floor(_timeInterval / 1000 / 3600 / 24)
	let hours = Math.floor(_timeInterval / 1000 / 3600)
	let minutes = Math.floor(_timeInterval / 1000 / 60)
	let seconds = Math.floor(_timeInterval / 1000)
	//取模处理 60进制
	minutes = minutes % 60
	seconds = seconds % 60
	const str = (hours ? hours + '小时' : '') + (minutes ? minutes + '分' : '') + (seconds ? seconds + '秒' : '')
	return {
		day,
		minute: Math.floor(_timeInterval / 1000 / 60),
		hour: Math.floor(_timeInterval / 1000 / 3600),
		timeString: str,
	}
}

const formatNumber = (n: number) => {
	const s = n.toString()
	return s[1] ? s : '0' + s
}

/**
 * 登录数据
 * @param username
 * @param password
 * @param accessToken
 */
export const setLoginData = (username: string, password: string, accessToken: string) => {
	// 存本地
	wx.setStorageSync('username', username)
	wx.setStorageSync('password', password)
	wx.setStorageSync('accessToken', accessToken)

	// 存全局数据
	globalData.username = username
	globalData.password = password
	globalData.isLogin = true
	globalData.accessToken = accessToken
}

/**
 * 移除登录数据
 */
export const reMoveLoginData = () => {
	// 存本地
	wx.removeStorageSync('username')
	wx.removeStorageSync('password')
	wx.removeStorageSync('accessToken')

	// 存全局数据
	globalData.username = ''
	globalData.password = ''
	globalData.isLogin = false
	globalData.accessToken = ''
}

/**
 * 获取本地信息
 * username
 * password
 * accessToken
 */
export const getLoaclAppData = () => {
	const username = wx.getStorageSync('username')
	const password = wx.getStorageSync('password')
	const accessToken = wx.getStorageSync('accessToken')
	console.log('本地数据', username, password, accessToken)
	if (username && password && accessToken) {
		setLoginData(username, password, accessToken)
	}
}

/**
 * 检查登录情况
 * @return Promise<Boolean>
 */
export const checkLogin = (): Promise<Boolean> => {
	getLoaclAppData()
	return new Promise((resolve) => {
		getUserInfoApi()
			.then((res) => {
				// 存登录信息
				console.warn('已登录', res)
				globalData.iconUrl = res.iconUrl
				resolve(true)
			})
			.catch(() => {
				resolve(false)
			})
	})
}
