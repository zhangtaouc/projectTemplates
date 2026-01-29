/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url: string | string[]) {
  return url.includes('http://') || url.includes('https://')
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  const valid_map = ['admin', 'editor']
  return valid_map.includes(str.trim())
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string) {
  const reg =
    /^(https?|ftp):\/\/([\d.A-Za-z-]+(:[\d$%&.A-Za-z-]+)*@)*((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}|([\dA-Za-z-]+\.)*[\dA-Za-z-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[A-Za-z]{2}))(:\d+)*(\/($|[\w#$%&'+,.=?\\~-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email: string) {
  const reg =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Z\\a-z-]+\.)+[A-Za-z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: any) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: any) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function isNullCheck(obj: { [x: string]: any }, arr: any[]) {
  let flag = true
  arr.forEach((element: PropertyKey) => {
    if (Object.prototype.hasOwnProperty.call(obj, element)) {
      if (Array.isArray(obj[element as keyof typeof obj])) {
        if (obj[element as keyof typeof obj].length === 0) {
          flag = false
        }
      } else if ((obj[element as keyof typeof obj] ?? '') === '') {
        flag = false
      }
    } else {
      flag = false
    }
  })
  return flag
}
