import {
  getDictListApi,
  getRegisterQrcodeApi,
  getVisitOrderDetailApi,
  submitVisitOrderApi
} from '@/api'
import { ShowToast } from '@/utils/showTips'
import { defineComponent, reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import showImage from '@/components/showImage/showImage.vue'
import Loading from '@/components/loading/loading.vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
interface ImputItem {
  name: string
  key: string
  placeholder: string
  errorMessage: string
  value: string
  required: boolean
  isError: boolean
  isSelectOpaction: boolean
  showValue: string
  isReadOnly?: boolean
}
export interface DictValue {
  id: number
  dictTypeId: number
  dictValueKey: string
  dictValueName: string
}

/**
 * 字典大类的接口 (数组的每一项主数据)
 */
export interface DictType {
  id: number
  dictKey: string
  dictName: string
  orderNum: number
  dictValues: DictValue[]
}

export default defineComponent({
  name: 'VisitPage',
  components: {
    showImage,
    Loading
  },
  setup() {
    const store = useStore()
    const { isSHowVisitBtn } = storeToRefs(store)
    const pickerObj = reactive({
      showPicker: false,
      title: '',
      columns: [] as any[]
    })
    const isVisited = ref(false)

    const isLoading = ref(false)

    const registerQrcode = ref('')

    const isShowRegisterQrcode = ref(false)

    const orderId = ref('')

    const isShowSubmit = ref(true)

    const registRxfStatus = ref(0)

    const router = useRouter()

    const currentInputKey = ref('')

    const visitType: Ref<'extra' | 'normal'> = ref('normal')

    const enterpriseFormList = reactive<ImputItem[]>([
      {
        name: '企业名称',
        key: 'companyName',
        placeholder: '请输入企业名称',
        errorMessage: '请输入企业名称',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: false,
        isReadOnly: false
      },
      {
        name: '统一社会信用代码',
        key: 'uscid',
        placeholder: '请输入统一社会信用代码',
        errorMessage: '请输入统一社会信用代码',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: false,
        isReadOnly: false
      },
      {
        name: '行业分类',
        key: 'sector',
        placeholder: '请选择行业分类',
        errorMessage: '请选择行业分类',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: true,
        isReadOnly: false
      },
      {
        name: '在农信社是否有贷款',
        key: 'ynrccCreditStatus',
        placeholder: '请选择在农信社是否有贷款',
        errorMessage: '请选择在农信社是否有贷款',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: true,
        isReadOnly: false
      },
      {
        name: '经营是否正常',
        key: 'businessStatus',
        placeholder: '请选择经营是否正常',
        errorMessage: '请选择经营是否正常',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: true,
        isReadOnly: false
      },
      {
        name: '融资需求明确度',
        key: 'requirementsIntentLevel',
        placeholder: '请选择融资需求明确度',
        errorMessage: '请选择融资需求明确度',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: true,
        isReadOnly: false
      },
      {
        name: '在农信结算情况',
        key: 'clearingStatus',
        placeholder: '请选择在农信结算情况',
        errorMessage: '请选择在农信结算情况',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: true,
        isReadOnly: false
      },
      {
        name: '走访人（客户经理）',
        key: 'visitObject',
        placeholder: '请选择走访人',
        errorMessage: '请选择走访人',
        value: '',
        showValue: '',
        required: true,
        isError: false,
        isSelectOpaction: false,
        isReadOnly: false
      }
    ])

    const specialIndustryTag = reactive({
      name: '特色行业标签',
      key: 'tag',
      placeholder: '请选择特色行业标签',
      errorMessage: '请选择特色行业标签',
      value: '',
      showValue: '',
      required: false,
      isError: false,
      isSelectOpaction: true,
      isReadOnly: false
    })

    const tagName = reactive({
      name: '其他特色备注',
      key: 'tagName',
      placeholder: '请输入其他特色备注',
      errorMessage: '请输入其他特色备注',
      value: '',
      showValue: '',
      required: false,
      isError: false,
      isSelectOpaction: false,
      isReadOnly: false
    })

    const otherRequirements = reactive({
      name: '其他业务需求',
      key: 'otherRequirements',
      placeholder: '请选择其他业务需求',
      errorMessage: '请选择其他业务需求',
      value: '',
      showValue: '',
      required: false,
      isError: false,
      isSelectOpaction: true,
      isReadOnly: false
    })

    const otherRequirementsRemake = reactive({
      name: '其他业务需求备注',
      key: 'otherRequirementsRemake',
      placeholder: '请输入其他业务需求备注',
      errorMessage: '请输入其他业务需求备注',
      value: '',
      showValue: '',
      required: false,
      isError: false,
      isSelectOpaction: false,
      isReadOnly: false
    })

    let opactionList = reactive([] as DictType[])
    function handleInput(item: ImputItem) {
      if (item.isSelectOpaction && !item.isReadOnly) {
        handlePicker(item)
      }
    }
    function handlePicker(item: ImputItem) {
      pickerObj.showPicker = true
      pickerObj.title = item.name
      currentInputKey.value = item.key
      const dictType = opactionList.find(i => item.key === i.dictKey)
      if (dictType) {
        pickerObj.columns = dictType.dictValues.map(i => ({
          text: i.dictValueName,
          value: i.dictValueKey
        }))
      }
    }
    function pickerOnConfirm(e: any) {
      pickerObj.showPicker = false
      if (['otherRequirements', 'tag'].includes(currentInputKey.value)) {
        const form =
          currentInputKey.value === 'otherRequirements'
            ? otherRequirements
            : specialIndustryTag
        form.value = e.selectedOptions[0].value
        form.showValue = e.selectedOptions[0].text || ''
      } else {
        const item = enterpriseFormList.find(
          i => i.key === currentInputKey.value
        )
        if (item) {
          item.value = e.selectedOptions[0].value
          item.showValue = e.selectedOptions[0].text || ''
        }
      }
    }
    function handleSubmit() {
      let status = true
      enterpriseFormList.forEach(item => {
        if (
          item.required &&
          ((!item.value && item.isSelectOpaction) ||
            (!item.isSelectOpaction && !item.showValue))
        ) {
          item.isError = true
          status = false
        } else {
          item.isError = false
        }
      })
      if (status) {
        isLoading.value = true
        submitVisitOrderApi(getSubmitParams()).then((res: any) => {
          isLoading.value = false
          if (res.code === 200) {
            isShowSubmit.value = false
            orderId.value = res.data.id
            getRegisterQrcode()
          }
        })
      }
      ShowToast(status ? '提交成功' : '请填写完整信息')
    }

    function getRegisterQrcode() {
      getRegisterQrcodeApi(orderId.value).then(res => {
        registerQrcode.value = res
        isShowRegisterQrcode.value = true
      })
    }
    function getSubmitParams() {
      const params = {} as any
      enterpriseFormList.forEach(item => {
        params[item.key] = item.value
        if (!item.isSelectOpaction) {
          params[item.key] = item.showValue
        }
      })
      params.tag = specialIndustryTag.value
      params.tagName = tagName.value
      params.otherRequirements = otherRequirements.value
      params.otherRequirementsRemake = otherRequirementsRemake.value
      params.registRxfStatus = registRxfStatus.value
      params.id = orderId.value
      return params
    }
    async function initPage() {
      orderId.value = (router.currentRoute.value.query.id as string) || ''
      visitType.value = (orderId.value as 'extra' | 'normal')
        ? 'normal'
        : 'extra'
      await getDictList()
      if (orderId.value) {
        getVisitOrderDetail()
      }
    }

    function getVisitOrderDetail() {
      getVisitOrderDetailApi(orderId.value).then((res: any) => {
        if (res.code === 200) {
          registRxfStatus.value = Number(res.data.registRxfStatus) === 0 ? 0 : 1
          isVisited.value = res.data.visitStatus === 1
          isShowSubmit.value = registRxfStatus.value === 0
          enterpriseFormList.forEach(item => {
            if (['companyName', 'uscid'].includes(item.key)) {
              item.showValue = res.data[item.key] || ''
              item.value = res.data[item.key] || ''
            }
            // 走访了
            if (res.data.visitStatus === 1) {
              // 下拉选项
              if (item.isSelectOpaction) {
                const opaction = opactionList.find(i => item.key === i.dictKey)
                if (opaction && opaction.dictValues?.length > 0) {
                  item.showValue =
                    opaction.dictValues.find(
                      i => i.dictValueKey === res.data[item.key]
                    )?.dictValueName || ''
                  item.value = res.data[item.key]
                }
              } else {
                // 输入框
                item.showValue = res.data[item.key] || ''
                item.value = res.data[item.key] || ''
              }
              item.isReadOnly = true
            }
          })
          // 走访了
          if (res.data.visitStatus === 1) {
            // 其他四个
            const special = getOpactionValue(specialIndustryTag.key, res)
            specialIndustryTag.value = special.value
            specialIndustryTag.showValue = special.showValue
            specialIndustryTag.isReadOnly = true
            const requireMent = getOpactionValue(otherRequirements.key, res)
            otherRequirements.value = requireMent.value
            otherRequirements.showValue = requireMent.showValue
            otherRequirements.isReadOnly = true
            otherRequirementsRemake.value =
              res.data[otherRequirementsRemake.key] || ''
            otherRequirementsRemake.isReadOnly = true
            tagName.value = res.data[tagName.key] || ''
            tagName.isReadOnly = true
          }
        }
      })
    }

    function getOpactionValue(key: string, res: any) {
      const item = {
        showValue: '',
        value: ''
      }
      const opaction = opactionList.find(i => key === i.dictKey)
      if (opaction && opaction.dictValues?.length > 0) {
        item.showValue =
          opaction.dictValues.find(i => i.dictValueKey === res.data[key])
            ?.dictValueName || ''
        item.value = res.data[key]
      }
      return item
    }

    function getDictList() {
      return new Promise((resolve, reject) => {
        getDictListApi().then((res: any) => {
          if (res.code === 200 && res.data.length > 0) {
            opactionList = res.data
            opactionList.forEach(i => {
              if (i.dictKey === 'sysYesNo') {
                i.dictKey = 'businessStatus'
                i.dictName = '经营是否正常'
              }
            })
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    }
    function controlRegisterQrcode() {
      isShowRegisterQrcode.value = !isShowRegisterQrcode.value
    }
    initPage()
    return {
      enterpriseFormList,
      pickerObj,
      pickerOnConfirm,
      handleInput,
      handleSubmit,
      visitType,
      otherRequirements,
      specialIndustryTag,
      otherRequirementsRemake,
      tagName,
      isShowSubmit,
      registerQrcode,
      controlRegisterQrcode,
      isShowRegisterQrcode,
      getRegisterQrcode,
      isLoading,
      isSHowVisitBtn,
      isVisited,
      registRxfStatus
    }
  }
})
