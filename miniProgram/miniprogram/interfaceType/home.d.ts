/**
 * 信息
 */
export interface Message {
  id:number
  message:string
}

export interface Dialog {
	id: number
	isShowDialog: boolean|string
	title: string
	message: string
	confirmTxt: string
	cancelTxt: string
  updateTime: string
  updateUser:string
	result: string
}