import {  RequestMethod } from 'miniprogram/interfaceType/http'
const token = () => getApp()?.globalData?.accessToken as string

/**
 * 请求方法
 */
export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

/**
 * 请求头类型
 */
export enum ContentType {
	JSON = 'application/json;charset=UTF-8',
	FORM = 'application/x-www-form-urlencoded',
	FORMDATA = 'multipart/form-data',
}

const getHeader = (contentType: ContentType) => {
	return {
		Authorization: token(),
		'content-type': contentType,
	}
}

/**
 * 网络请求
 * @param requestMethod 请求方法
 * @param url url
 * @param requestBody 请求体
 */
export function httpFetch<T>(requestMethod: RequestMethod, url: string, requestBody?: Object, contentType: ContentType = ContentType.JSON): Promise<T> {
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			method: requestMethod,
			data: requestBody,
			header: getHeader(contentType),
			success: (resultData: any) => {
				const data = resultData.data || {}
				console.warn('接口返回', resultData, data)
				if (data?.retCode === '00000') {
					resolve(data.retData)
				} else {
					console.error('接口有误', data)
					reject(data)
				}
			},
			fail: (err) => {
				console.error('接口失败', err)
				reject(null)
			},
		})
	})
}
