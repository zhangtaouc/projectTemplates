import { request } from '@/utils/http'

import {
  getCaptchaURL,
  getRegisterQrcodeURL,
  getUserInfoURL,
  loginURL,
  queryDictListURL,
  queryVisitOrderDetailURL,
  queryVisitOrderListURL,
  queryVisitOrderStatisticsURL,
  visitSubmitURL
} from '@/utils/url'

/**
 * 获取图片验证码
 */
export function getCaptchaApi() {
  return request('GET', getCaptchaURL, {}, true)
}

/**
 * 登录
 */
export function loginApi(body: {
  userName: string
  passWord: string
  code: string
}) {
  return request('POST', loginURL, body, false, true)
}

/**
 * 获取用户信息
 */
export function getUserInfoApi(): Promise<object | null> {
  return new Promise(resolve => {
    request('GET', getUserInfoURL)
      .then((res: any) => {
        if (res.code === 200 && res.data) {
          resolve(res.data)
        } else {
          resolve(null)
        }
      })
      .catch(() => {
        resolve(null)
      })
  })
}

/**
 * 0: 未走访、未注册
 * 1: 已走访、已注册
 */
export type StatusType = '0' | '1'
/**
 * 查询走访任务列表
 */
export function getVisitOrderListApi(params: {
  page: string
  limit: string
  companyName?: string
  batchName?: string
  visitStatus?: StatusType
  registRxfStatus?: StatusType
}) {
  let queryParams = ''
  if (params.companyName) {
    queryParams += `companyName=${params.companyName}&`
  }
  if (params.batchName) {
    queryParams += `batchName=${params.batchName}&`
  }
  if (params.visitStatus) {
    queryParams += `visitStatus=${params.visitStatus}&`
  }
  if (params.registRxfStatus) {
    queryParams += `registRxfStatus=${params.registRxfStatus}&`
  }
  queryParams += `page=${params.page}&limit=${params.limit}`
  return request('GET', queryVisitOrderListURL + '?' + queryParams)
}

/**
 * 走访任务列表统计
 */
export function queryVisitOrderStatisticsApi(batchName = '') {
  let queryParams = ''
  if (batchName) {
    queryParams += `batchName=${batchName}&`
  }
  return request('GET', queryVisitOrderStatisticsURL + '?' + queryParams)
}

/**
 * 走访任务详情
 */
export function getVisitOrderDetailApi(orderId: string) {
  return request('GET', queryVisitOrderDetailURL + '/' + orderId)
}

/**
 * 获取字典列表
 */
export function getDictListApi() {
  return request(
    'GET',
    queryDictListURL +
      '?dictNames=sector,tag,ynrccCreditStatus,requirementsIntentLevel,clearingStatus,otherRequirements,registRxfStatus,visitStatus,registRxfStatus,tagName,otherRequirementsRemake,businessStatus,sysYesNo'
  )
}

/**
 * 走访任务提交
 */
export function submitVisitOrderApi(body: any) {
  return request('POST', visitSubmitURL, body)
}

/**
 * 获取注册二维码
 */
export function getRegisterQrcodeApi(id: string): Promise<string> {
  return new Promise(resolve => {
    request('GET', getRegisterQrcodeURL + '/' + id, {}, true)
      .then((res: Blob) => {
        const pngBlob = new Blob([res], { type: 'image/png' })
        resolve(URL.createObjectURL(pngBlob))
      })
      .catch(() => {
        resolve('')
      })
  })
}
