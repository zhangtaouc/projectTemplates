import {
  getRegisterQrcodeApi,
  getVisitOrderListApi,
  queryVisitOrderStatisticsApi,
  type StatusType
} from '@/api'
import router from '@/router'
import { defineComponent, ref, reactive, defineOptions } from 'vue'
import showImage from '@/components/showImage/showImage.vue'
import { ShowDialog, ShowToast } from '@/utils/showTips'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

// 任务列表项类型定义
interface TaskItem {
  id: string
  batchName: string
  companyName: string
  visitStatus: StatusType
  isVisited: boolean
  registRxfStatus: StatusType
  isRegistered: boolean
  visitObject?: string
}

interface ColumnItem {
  text: string
  value: string
}

type PickerType = 'isVisited' | 'registered'

export default defineComponent({
  name: 'Home',
  components: {
    showImage
  },
  setup() {
    defineOptions({
      name: 'Home'
    })
    const store = useStore()
    const { isSHowVisitBtn, isCollapse } = storeToRefs(store)
    const isLoadedData = ref(false)
    const nickName = ref(store.nickName || localStorage.getItem('nickName'))
    const picker = reactive({
      type: '' as PickerType,
      title: '',
      value: [''],
      isShow: false,
      columns: [] as ColumnItem[]
    })
    const statistics = reactive({
      visit: 0,
      unvisit: 0
    })
    const getOrderListParams = reactive({
      total: 0,
      page: 1,
      limit: 10,
      companyName: '',
      batchName: '',
      visitStatus: '0',
      visitStatusText: '未走访',
      registRxfStatus: '',
      registRxfStatusText: ''
    })

    const visitorColumns = ref([
      {
        text: '全部',
        value: ''
      },
      {
        text: '已走访',
        value: '1'
      },
      {
        text: '未走访',
        value: '0'
      }
    ])

    const registerColumns = ref([
      {
        text: '全部',
        value: ''
      },
      {
        text: '已注册',
        value: '1'
      },
      {
        text: '未注册',
        value: '0'
      }
    ])

    // 任务列表响应式数据
    const taskList = ref<TaskItem[]>([])

    function onConfirm(e: any) {
      picker.value = e.selectedValues
      picker.isShow = false
      // 设置表单
      if (picker.type === 'isVisited') {
        getOrderListParams.visitStatus = e.selectedValues[0]
        getOrderListParams.visitStatusText = e.selectedValues[0]
          ? visitorColumns.value.find(
              item => item.value === e.selectedValues[0]
            )?.text || ''
          : ''
      } else if (picker.type === 'registered') {
        getOrderListParams.registRxfStatus = e.selectedValues[0]
        getOrderListParams.registRxfStatusText = e.selectedValues[0]
          ? registerColumns.value.find(
              item => item.value === e.selectedValues[0]
            )?.text || ''
          : ''
      }
      initPage()
    }

    function controlPicker(field: PickerType) {
      picker.type = field
      picker.isShow = !picker.isShow
      picker.value = ['']
      picker.title = field === 'isVisited' ? '是否已走访' : '是否注册'
      picker.columns =
        field === 'isVisited' ? visitorColumns.value : registerColumns.value
    }

    function handlePageChange(page: number) {
      getOrderListParams.page = page
      getVisitOrderList()
    }

    function goVisitPage(id?: string | number) {
      const task = taskList.value.find(item => item.id === id)
      // 没有访问权限 && 任务未走访点了没反应
      if (!isSHowVisitBtn.value && !task?.isVisited) {
        return
      }
      router.push({
        path: '/visitPage',
        query: { id }
      })
    }

    function reset() {
      getOrderListParams.visitStatus = ''
      getOrderListParams.visitStatusText = ''
      getOrderListParams.registRxfStatus = ''
      getOrderListParams.registRxfStatusText = ''
      getOrderListParams.page = 1
      getOrderListParams.companyName = ''
      getOrderListParams.batchName = ''
      initPage()
    }

    function getVisitOrderList() {
      const visitStatus =
        getOrderListParams.visitStatus as unknown as StatusType
      const registRxfStatus =
        getOrderListParams.registRxfStatus as unknown as StatusType
      getVisitOrderListApi({
        page: getOrderListParams.page.toString(),
        limit: getOrderListParams.limit.toString(),
        companyName: getOrderListParams.companyName,
        batchName: getOrderListParams.batchName,
        visitStatus,
        registRxfStatus
      })
        .then(res => {
          getOrderListParams.total = res?.count || 0
          if (res?.data.length >= 0) {
            taskList.value = res.data.map((item: any) => ({
              ...item,
              isVisited: item.visitStatus?.toString() === '1',
              isRegistered: item.registRxfStatus?.toString() === '1'
            }))
          }
          if (isLoadedData.value) {
            ShowToast('查询成功')
          }

          isLoadedData.value = true
        })
        .catch(() => {
          isLoadedData.value = true
        })
    }

    function queryVisitOrderStatistics() {
      queryVisitOrderStatisticsApi(getOrderListParams.batchName).then(res => {
        if (res?.data) {
          statistics.visit = res.data.visit || 0
          statistics.unvisit = res.data.unvisit || 0
        }
      })
    }

    function initPage() {
      getVisitOrderList()
      queryVisitOrderStatistics()
    }

    const registerQrcode = ref('')
    const isShowRegisterQrcode = ref(false)
    function getRegisterQrcode(id: string) {
      getRegisterQrcodeApi(id).then(res => {
        registerQrcode.value = res
        isShowRegisterQrcode.value = true
      })
    }

    function controlRegisterQrcode() {
      isShowRegisterQrcode.value = !isShowRegisterQrcode.value
    }

    function loginOut() {
      ShowDialog('提示', '确定退出登录吗？').then(() => {
        useStore().isLogin = false
        useStore().token = ''
        useStore().nickName = ''
        localStorage.removeItem('token')
        localStorage.removeItem('nickName')
        window.location.reload()
      })
    }

    initPage()
    return {
      taskList,
      onConfirm,
      controlPicker,
      picker,
      handlePageChange,
      goVisitPage,
      getOrderListParams,
      isLoadedData,
      initPage,
      reset,
      queryVisitOrderStatistics,
      statistics,
      getRegisterQrcode,
      registerQrcode,
      isShowRegisterQrcode,
      controlRegisterQrcode,
      isSHowVisitBtn,
      nickName,
      loginOut,
      isCollapse
    }
  }
})
