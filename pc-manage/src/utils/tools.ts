/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: { [x: string]: any }) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result
}

/**
 * 获取token
 * @returns token
 */
export function getAccessToken(): string | null {
  return LocalStorage.get('access_token')
}

/**
 * 设置token
 * @param token token
 */
export function setAccessToken(token: string) {
  LocalStorage.set('access_token', token)
}

/**
 * 本地存储
 */
export class LocalStorage {
  /**
   * 设置本地存储
   * @param key 键
   * @param value 值
   */
  static set(key: string, value: string) {
    if (!localStorage) {
      return
    }
    if (key) {
      localStorage.setItem(key, value)
    }
  }

  /**
   * 获取本地存储
   * @param key 键
   * @returns 值
   */
  static get(key: string) {
    if (!localStorage) {
      return null
    }
    if (key) {
      return localStorage.getItem(key)
    }
    return null
  }

  static remove(key: string) {
    if (!localStorage) {
      return
    }
    if (key) {
      localStorage.removeItem(key)
    }
  }
  static clear() {
    localStorage.clear()
  }
}

/**
 * 将Blob对象转换为Base64编码的字符串
 * @param blob Blob对象
 * @returns Promise<string> Base64编码的字符串
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 核心转换方法：读取Blob并转为Base64
    reader.readAsDataURL(blob)
    // 读取成功的回调
    reader.onload = () => resolve(reader.result as string)
    // 读取失败的回调
    reader.onerror = err => reject(err)
  })
}

/**
 * 设置/修改Cookie
 * @param name - Cookie名称（字符串类型）
 * @param value - Cookie值（字符串类型）
 * @param days - 过期时长（天，可选，number | null，不传则为会话Cookie）
 * @param path - Cookie路径（可选，默认/，需与原Cookie一致）
 * @param domain - Cookie域名（可选，字符串类型）
 * @returns void
 */
function setCookie(
  name: string,
  value: string,
  days: number | null = null,
  path: string = '/',
  domain: string = ''
): void {
  // 基础Cookie字符串，对名称和值进行URI编码（避免特殊字符问题）
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  // 设置过期时间（修改会话时长的核心逻辑）
  if (days !== null) {
    const date = new Date()
    // 计算过期时间：当前时间 + 天数*24*60*60*1000毫秒
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    // expires：绝对时间（兼容所有浏览器）
    cookieStr += `; expires=${date.toUTCString()}`
  }

  // 路径（必须与原Cookie一致，否则无法覆盖）
  cookieStr += `; path=${path}`

  // 域名（可选，如需跨子域名共享需设置）
  if (domain) {
    cookieStr += `; domain=${domain}`
  }

  // 写入Cookie（覆盖原有同名Cookie）
  document.cookie = cookieStr
}

/**
 * 获取Cookie值
 * @param name - Cookie名称（字符串类型）
 * @returns Cookie值（字符串 | null，无则返回null）
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    // 解码后匹配名称，确保准确获取
    if (decodeURIComponent(cookieName || '') === name) {
      return decodeURIComponent(cookieValue || '')
    }
  }
  return null
}

/**
 * 删除Cookie（通过设置过期时间为过去实现）
 * @param name - Cookie名称（字符串类型）
 * @param path - 同原Cookie路径（可选，默认/）
 * @param domain - 同原Cookie域名（可选）
 * @returns void
 */
export function deleteCookie(
  name: string,
  path: string = '/',
  domain: string = ''
): void {
  // 设为-1天，让Cookie立即过期
  setCookie(name, '', -1, path, domain)
}
