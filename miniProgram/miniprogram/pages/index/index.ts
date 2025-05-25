import { Dialog } from 'miniprogram/interfaceType/home'
import {
	addStepApi,
	addVisitorApi,
	getCircleListApi,
	getDialogApi,
	getLeaveWorddsApi,
	getMessagesApi,
	sendLeaveWordsApi,
	updateDialogApi,
} from '../../utils/api'
import { DateTools, getLocalStorage, setLocaStorage, getLocationTools } from '../../utils/util'
import type { Circle } from './interface'
// 获取应用实例
const app = getApp<IAppOption>()

Page({
	data: {
		name: '',
		nameValue: '',
		messageStep: 0,
		isShowCircle: false,
		showMessage: '1',
		isShowMessage: false,
		isShowSomeWord: false,
		isShowDialog: false,
		messages: [] as string[],
		ourWords: [] as string[],
		overlayMessage: '',
		dialogMessage: {} as Dialog,
		ciecles: [] as Circle[],
		isShowOverlay: false,
		sensValue: '',
	},

	onLoad() {
		this.initPage()
	},

	reset() {
		this.setData({
			messageStep: 0,
			isShowMessage: false,
			isShowCircle: false,
			isShowSomeWord: false,
			isShowDialog: false,
		})
	},

	resetInfo() {
		this.reset()
		const nameValue = this.data.name
		this.setData({
			name: '',
			nameValue,
		})
	},

	getName() {
		this.setData({
			name: this.data.nameValue,
		})
		this.addVisitor(this.data.nameValue)
		setLocaStorage('username', this.data.nameValue)
	},

	messageControl(e: any) {
		const value = e.currentTarget.dataset.key === 'add' ? 1 : -1
		const messageStep = this.data.messageStep + value
		if (this.data.messages.length > messageStep - 1 && messageStep - 1 >= 0) {
			this.setData({
				showMessage: this.data.messages[messageStep - 1],
			})
		}
		const isShowMessage = this.data.messages.length > messageStep - 1 && messageStep - 1 >= 0
		console.log(messageStep, this.data.messages.length, this.data.messages.length <= messageStep - 1)
		this.setData({
			messageStep,
			isShowMessage,
			isShowCircle: this.data.messages.length <= messageStep - 1,
		})

		if (this.data.isShowCircle) {
			addStepApi('开始circle', this.data.name).then(() => {
				console.log('新增步骤成功-开始circle')
			})
		}
	},

	startChat() {
		this.setData({
			messageStep: 1,
			showMessage: this.data.messages[0],
			isShowMessage: true,
		})

		addStepApi('开始message', this.data.name).then(() => {
			console.log('新增步骤成功-开始message')
		})
	},

	clickCircle(e: any) {
		const id = e.currentTarget.dataset.id
		const circle = this.data.ciecles.find((i) => i.id === id)
		this.setData({
			isShowOverlay: true,
			overlayMessage: circle?.message || '',
		})
	},

	hideOverlay() {
		this.setData({
			isShowOverlay: false,
		})
	},

	showSomeWord() {
		this.setData({
			isShowCircle: false,
			isShowMessage: false,
			isShowSomeWord: true,
			isShowDialog: true,
		})

		addStepApi('开始对话', this.data.name).then(() => {
			console.log('新增步骤成功-开始对话')
		})
	},

	dialogConfirm() {
		console.log('点击了确认')
		this.updateDialog(true)
	},

	dialogCancel() {
		console.log('点击了取消')
		this.updateDialog(false)
	},

	// 更新dialog
	updateDialog(key: boolean) {
		const dialog = JSON.parse(JSON.stringify(this.data.dialogMessage)) as Dialog
		dialog.updateUser = this.data.name
		dialog.result = String(key)
		dialog.updateTime = new DateTools().getYMDHMSString().fullYear
		dialog.isShowDialog = String(dialog.isShowDialog)
		console.log('更新', dialog)
		updateDialogApi(dialog)
	},

	initPage() {
		// 获取用过户
		const name = getLocalStorage<string>('username') || ''
		this.setData({ name })
		if (name) {
			this.addVisitor(name)
		}

		// 获取信息
		getMessagesApi().then((messages) => {
			console.log('获取信息成功', messages)
			const list = [] as string[]
			messages.forEach((i) => {
				list.push(i.message)
			})
			this.setData({ messages: list })
		})

		// 获取circle
		getCircleListApi().then((ciecles) => {
			console.log('获取circle成功', ciecles)
			this.setData({ ciecles })
		})

		// 获取留言
		this.getLeaveWords()

		// 获取弹窗
		this.getDialog()
	},

	// 新增访客
	addVisitor(name: string) {
		getLocationTools((isAuth, latitude, longitude) => {
			console.log(isAuth)
			addVisitorApi(name, latitude || 0, longitude || 0).then(() => {
				console.log('新增访客成功')
			})
		})
	},

	/**
	 * 获取留言
	 */
	getLeaveWords() {
		getLeaveWorddsApi().then((LeaveWords) => {
			console.log('获取留言成功', LeaveWords)
			const ourWords = [] as string[]
			LeaveWords.forEach((i) => {
				ourWords.push(i.word)
			})
			this.setData({ ourWords })
		})
	},

	/**
	 * 发送留言
	 */
	sendLeaveWords() {
		const word = this.data.sensValue
		if (word) {
			sendLeaveWordsApi(word, this.data.name).then(() => {
				this.getLeaveWords()
				this.setData({ sensValue: '' })
			})
		}
	},

	/**
	 * 获取弹窗信息
	 */
	getDialog() {
		getDialogApi().then((dialogs) => {
			if (dialogs?.length > 0) {
				const dialogMessage = dialogs[0]
				dialogMessage.isShowDialog = dialogMessage.isShowDialog === 'true'
				this.setData({ dialogMessage })
			}
			console.log('获取弹窗成功', dialogs, this.data.dialogMessage)
		})
	},
})
