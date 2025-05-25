export interface AppOption {
	global: GlobalData
}

/**
 * 时间类型
 */
export interface FullDate {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

/**
 * 全局数据
 */
export interface GlobalData {
	appEnv: AppEnv
	isLoadSuccess: boolean
	isLogin: boolean
	username: string
	password: string
	accessToken: string
  isConfirm: boolean
  iconUrl: string
}

/**
 * app环境
 */
export type AppEnv = 'local' | 'test' | 'prod'

/**
 * 登陆返回数据
 */
export interface LoginRetData {
	token: string
}

/**
 * 用户信息
 */
export interface UserInfoRetData {
	id: number
	username: string
	password?: string
	iconUrl: string
	createTime: number
	updateTime: number
}

/**
 * 轮播图数据
 */
export interface BannerRetData {
	id: number
	indicatorColor: string
	indicatorActiveColor: string
	notice: string
	banners: [
		{
			image: string
			text: Array<string>
		},
		{
			image: string
			text: Array<string>
		}
	]
}

/**
 *  遇见数据
 */
export interface Meet {
	formateTime?: {
		year: number
		month: number
		day: number
		hour: number
		minute: number
		second: number
		fullTime: string
	}
	id: number
	monthPosition: string
	time: number
	isImportantDay: '' | 'true' | 'false'
	meetTitle: Array<string>
	doLoveAll: number
	doLoveTimes: number
	meetImage: string
	meetContent: {
		title: string
		answer: Array<string>
	}
	mapPoint: {
		content: string
		longitude: string
		latitude: string
	}
}

/**
 * 月相遇信息
 */
export interface MeetMonth {
	month: number
	position: string
	list: Array<Meet>
}

/**
 * 遇见数据
 */
export interface MeetData {
	//年
	[key: number]: Array<MeetMonth>
}

/**
 * 遇见信息
 */
export interface MeetInfo {
	id: number
	meetInfo: string
	loveTime: number
	headerBg: string
	contentTitle: string
	map: [
		{
			code: string
			name: string
			url: string
		},
		{
			code: string
			name: string
			url: string
		}
	]
	updateTime: number
}

/**
 * 地图配置
 */
export interface MapConfig {
	id: number
	borderColor: string
	borderRadius: number
	bgColor: string
	padding: number
	fontSize: number
	color: string
	display: string
	scale: number
	showLocation: boolean
	enableSatellite: boolean
	enableTraffic: boolean
	enableBuilding: boolean
}

/**
 * 登录框类型
 */
export type LoginBoxType = 'login' | 'change-info' | 'register' | 'login-out' | 'change-psd'

/**
 * toast弹窗类型
 */
export type ToastType = 'loading' | 'success' | 'fail' | 'clear' | 'text'

/**
 * 首页弹窗
 */
export interface HomeDialog {
	title: string
	placeholder: string
	homeDialogType: 'text'|'image'
	dialogImg: string
  dialogText: string
  confirmkey:string
}


