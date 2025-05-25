import { CommonRetData } from '../interfaceType/api'
import { Dialog, Message } from 'miniprogram/interfaceType/home'
import { httpFetch, HttpMethod } from './http'
import { circleListUrl, dialogUrl, leaveWordUrl, messageListUrl, stepUrl, visiterUrl } from './URL'
import { DateTools } from './util'
import { Circle, LeaveWord } from 'miniprogram/pages/index/interface'

/**
 * 获取访客
 */
export const getVisitor = () => httpFetch<CommonRetData>(HttpMethod.GET, visiterUrl)

/**
 * 新增访客
 * @param username 访客名
 * @param visitTime 时间
 */
export const addVisitorApi = (username: string, latitude?: number, longitude?: number) => {
	const visitTime = new DateTools().getYMDHMSString().fullYear
	return httpFetch<CommonRetData>(HttpMethod.POST, visiterUrl, { username, visitTime, latitude, longitude })
}

/**
 * 获取信息
 */
export function getMessagesApi() {
	return httpFetch<Message[]>(HttpMethod.GET, messageListUrl)
}

/**
 * 获取circle
 */
export function getCircleListApi() {
	return httpFetch<Circle[]>(HttpMethod.GET, circleListUrl)
}

/**
 * 获取留言
 */
export function getLeaveWorddsApi() {
	return httpFetch<LeaveWord[]>(HttpMethod.GET, leaveWordUrl)
}

/**
 * 新增留言
 * @param word 留言
 * @param username 名字
 */
export function sendLeaveWordsApi(word: string, username: string) {
	const time = new DateTools().getYMDHMSString().fullYear
	return httpFetch(HttpMethod.POST, leaveWordUrl, { word, time, username })
}

/**
 * 获取弹窗信息
 */
export function getDialogApi() {
	return httpFetch<Dialog[]>(HttpMethod.GET, dialogUrl)
}

/**
 * 更新弹窗
 * @param dialog 弹窗
 */
export function updateDialogApi(dialog: Dialog) {
	return httpFetch(HttpMethod.PUT, dialogUrl, dialog)
}

/**
 * 新增步骤
 * @param step 步骤
 * @param username 用户
 */
export function addStepApi(step: string, username: string) {
	const time = new DateTools().getYMDHMSString().fullYear
	return httpFetch(HttpMethod.POST, stepUrl, { step, time, username })
}

export const getMapConfigApi = () => {
	return httpFetch
}
