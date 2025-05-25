import { FullDate } from '../interfaceType/common'

export const formatTime = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
	const s = n.toString()
	return s[1] ? s : '0' + s
}

/**
 * 时间工具类
 */
export class DateTools {
	year = 0
	month = 0
	day = 0
	hour = 0
	minute = 0
	second = 0
	timestamp = 0

	constructor(timestamp?: number) {
		let date: Date
		if (timestamp) {
			date = new Date(timestamp)
		} else {
			date = new Date()
		}
		this.year = date.getFullYear()
		this.month = date.getMonth() + 1
		this.day = date.getDate()
		this.second = date.getSeconds()
		this.hour = date.getHours()
		this.minute = date.getMinutes()
		this.second = date.getSeconds()
		this.timestamp = date.getTime()
	}

	/**
	 * 获取年月日时分秒-整数
	 * @return year:年，month:月，day:日，hour:时，minute:分，second:秒
	 */
	getYMDHMSNumber() {
		return {
			year: this.year,
			month: this.month,
			day: this.day,
			hour: this.hour,
			minute: this.minute,
			second: this.second,
			timestamp: this.timestamp,
		}
	}
	/**
	 * 获取年月日时分秒-字符串且补零，默认用当前时间
	 * @return fullYear:年月日时分秒，year:年，month:月，day:日，hour:时，minute:分，second:秒
	 */
	getYMDHMSString(fullTime = {} as FullDate) {
		const year = String(fullTime.year || this.year)
		const month = String(fullTime.month || this.month).padStart(2, '0')
		const day = String(fullTime.day || this.day).padStart(2, '0')
		const hour = String(fullTime.hour || this.hour).padStart(2, '0')
		const minute = String(fullTime.minute || this.minute).padStart(2, '0')
		const second = String(fullTime.second || this.second).padStart(2, '0')
		const fullYear = `${year}-${month}-${day} ${hour}:${minute}:${second}`
		return { fullYear, year, month, day, hour, minute, second }
	}

	/**计算添加一段时间后的时间
	 * @param {*某个时间的时间戳} timestamp
	 * @param {*毫秒} addMillisecond
	 * @return {*单位：明天或者后天，新加的时间}
	 */
	getAddTime(timestamp: number, addMillisecond = 0) {
		let unit = ''
		// 传入时间
		const outTime = new Date(timestamp)
		// 一天
		const oneDayMillisecond = 24 * 60 * 60 * 1000
		// 找到到明天还要多久
		const differTimestamp =
			new Date(`${outTime.getFullYear()}/${outTime.getMonth() + 1}/${outTime.getDate()}`).getTime() +
			oneDayMillisecond -
			timestamp
		// addMillisecond大于差值则说明是非今天
		if (addMillisecond >= differTimestamp) {
			unit = addMillisecond - differTimestamp >= oneDayMillisecond ? '后天' : '明天'
		}
		const targetTime = new Date(timestamp + addMillisecond)
		const targetHour = String(targetTime.getHours()).padStart(2, '0')
		const targetMinute = String(targetTime.getMinutes()).padStart(2, '0')
		return { unit, time: `${targetHour}:${targetMinute}` }
	}
}

/**
 * 获取本地存储
 * @param key 存储key值
 */
export function getLocalStorage<T>(key: string) {
	return wx.getStorageSync(key) as T
}

/**
 * 设置本地存储
 * @param key 存储key值
 * @param value 存储值
 */
export function setLocaStorage(key: string, value: any) {
	wx.setStorageSync(key, value)
}

/**
 * 获取位置信息
 * @param {*} callback(isAuth, latitude, longitude)
 */
export function getLocationTools(callback: (isAuth: boolean, latitude?: number, longitude?: number) => void) {
	console.log('触发地理位置')
	wx.getSetting({
		success: (res) => {
			console.log('wx.getSetting res', res)
			if (res.authSetting['scope.userLocation'] == undefined) {
				// 未授权过
				wx.authorize({
					scope: 'scope.userLocation',
					success() {
						// 用户同意开启授权
						// 进行地理位置授权完成后的逻辑操作
						wx.getLocation({
							type: 'wgs84',
							success: (res) => {
								callback(true, res.latitude, res.longitude)
							},
							fail: (err) => {
								console.log('授权定位失败', err)
								callback(false)
								// if (err.errCode == 2) {
								// 	wx.showToast({
								// 		title: '请打开手机位置信息后重试',
								// 		icon: 'none',
								// 		duration: 2500,
								// 	})
								// }
							},
						})
					},
					fail(res) {
						console.log('用户拒绝开启授权', res)
						callback(false)
						//用户拒绝开启授权
						// wx.showToast({
						// 	title: '定位授权失败',
						// 	icon: 'none',
						// })
					},
				})
			} else if (res.authSetting['scope.userLocation'] == false) {
				console.log('拒绝授权')
				wx.showModal({
					title: '您未开启地理位置授权',
					content: '是否前往授权？',
					success: (res) => {
						if (res.confirm) {
							wx.openSetting()
						}
					},
				})
				console.log('拒绝授权')
				callback(false)
			} else {
				wx.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('授权定位成功', res)
						callback(true, res.latitude, res.longitude)
					},
					fail: (err) => {
						console.log('授权定位失败', err)
						// if (err.errCode == 2) {
						// 	wx.showToast({
						// 		title: '请打开手机位置信息后重试',
						// 		icon: 'none',
						// 		duration: 2500,
						// 	})
						// }
						callback(false)
					},
				})
			}
		},
	})
}

/**
 * 使用微信内置地图查看位置
 * @param {*} longitude 经度
 * @param {*} latitude 维度
 * @param {*} name 位置名
 * @param {*} address 地址的详细说明
 * @param {*} scale 缩放比例
 */
export function openLocationTool(longitude: number, latitude: number, name: string, address: string, scale = 18) {
	console.log('openLocationTool', longitude, latitude, name, address, scale)
	return wx.openLocation({
		latitude,
		longitude,
		name,
		address,
		scale,
	})
}
