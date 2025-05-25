/**
 * 请求头
 */
export interface Headers {
	Authorization: string
	'content-type': 'application/x-www-form-urlencoded' | 'application/json;charset=UTF-8' | 'multipart/form-data'
}

/**
 * 请求方法类型
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * 接口返回数据类型
 */
export interface ResultData<T = null> {
	retCode: '00000' | '00001'
	message: string
	retData: T
}
