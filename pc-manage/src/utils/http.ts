import axios from 'axios'
import { tansParams } from '@utils/tools'
// 是否显示重新登录
export const isRelogin = { show: false }
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
console.log('API_BASE_URL', import.meta.env.VITE_APP_API_BASE_URL)
const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  // 超时
  timeout: 15000,
  // 语言设置 zh-CN en
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    return res.status === 200 && res.data
      ? Promise.resolve(res.data)
      : Promise.reject(res)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

export interface RequestBody {
  [key: string]: object | string
}

/**
 * 接口请求封装
 * @param method 请求方法 'GET' | 'POST'|'DELETE'|'PUT'
 * @param url 接口
 * @param body body
 */
export function request(
  method: RequestMethod,
  url: string,
  body: RequestBody | Array<any> = {},
  isBlob = false,
  isFormData = false
): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestBody: any =
      body && Object.keys(body).length > 0
        ? { url, method, data: body, headers: {} }
        : { url, method, headers: {} }
    if (isBlob) {
      requestBody.responseType = 'blob'
    }
    if (isFormData) {
      requestBody.headers['Content-Type'] = 'multipart/form-data'
    }
    service(requestBody)
      .then((res: any) => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
