import { getCaptchaApi, getUserInfoApi, loginApi } from '@/api'
import { useStore } from '@/store'
import { ShowToast } from '@/utils/showTips'
import { decode, encode } from 'js-base64'
import { computed, defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isPasswordVisible = ref(false)
    const loginForm = ref({
      username: '',
      password: '',
      verificationCode: ''
    })
    const verificationCodeImg = ref('')
    const formErrorMsg = ref({
      username: '',
      password: '',
      verificationCode: ''
    })
    const isLoading = ref(false)

    /**
     * 登录处理
     */
    function handleLogin() {
      loginForm.value.username = loginForm.value.username.trim()
      loginForm.value.password = loginForm.value.password.trim()
      loginForm.value.verificationCode = loginForm.value.verificationCode.trim()
      formErrorMsg.value.username = !loginForm.value.username
        ? '请输入用户名'
        : ''
      formErrorMsg.value.password = !loginForm.value.password
        ? '请输入密码'
        : ''
      formErrorMsg.value.verificationCode = !loginForm.value.verificationCode
        ? '请输入验证码'
        : ''
      if (
        !loginForm.value.username ||
        !loginForm.value.password ||
        !loginForm.value.verificationCode
      ) {
        return
      }
      isLoading.value = true
      loginApi({
        userName: loginForm.value.username,
        passWord: loginForm.value.password,
        code: loginForm.value.verificationCode
      })
        .then((e: any) => {
          if (e?.token) {
            isLoading.value = false
            if (router.currentRoute.value.query.redirect) {
              const param = decodeURIComponent(
                router.currentRoute.value.query.redirect as string
              )
              console.log('重定向地址', !!param)
              if (param) {
                localStorage.setItem(
                  'username',
                  encode(loginForm.value.username)
                )
                localStorage.setItem(
                  'password',
                  encode(loginForm.value.password)
                )
                ElMessage({
                  message: '登录成功',
                  type: 'success'
                })
                setTimeout(() => {
                  window.location.replace(param as string)
                }, 400)
                return
              }
            }
            // 获取用户信息
            getUserInfoApi().then((res: any) => {
              if (res?.nickName) {
                useStore().nickName = res.nickName
                localStorage.setItem('nickName', res.nickName)
                localStorage.setItem(
                  'username',
                  encode(loginForm.value.username)
                )
                localStorage.setItem(
                  'password',
                  encode(loginForm.value.password)
                )
              }
            })
            useStore().isLogin = true
            useStore().token = e.token
            localStorage.setItem('token', e.token)
            ShowToast('登录成功')
            setTimeout(() => {
              router.replace(
                decodeURIComponent((route.query.to as string) || '/')
              )
            }, 100)
            if (e?.menuPerms) {
              useStore().isSHowVisitBtn =
                e.menuPerms.includes('orderItem:submit')
              localStorage.setItem(
                'isSHowVisitBtn',
                String(useStore().isSHowVisitBtn)
              )
            }
          } else {
            isLoading.value = false
            getCaptcha()
            ShowToast(e.message)
          }
        })
        .catch(() => {
          isLoading.value = false
          getCaptcha()
          ShowToast('登录失败，请重试')
        })
    }

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value
    }

    const getPasswordIcon = computed(() => {
      return isPasswordVisible.value
        ? new URL('../../assets/images/psd-hidden-icon.svg', import.meta.url)
            .href
        : new URL('../../assets/images/psd-show-icon.svg', import.meta.url).href
    })

    function initPage() {
      getCaptcha()
      console.log(
        decodeURIComponent(router.currentRoute.value.query.redirect as string)
      )
      const username = localStorage.getItem('username')
      const password = localStorage.getItem('password')
      console.log(username, password)
      if (username && password) {
        try {
          loginForm.value.username = decode(username)
          loginForm.value.password = decode(password)
        } catch (error) {
          console.log(error)
        }
      }
    }

    function getCaptcha() {
      getCaptchaApi().then((res: Blob) => {
        const pngBlob = new Blob([res], { type: 'image/png' })
        verificationCodeImg.value = URL.createObjectURL(pngBlob)
      })
    }

    initPage()

    return {
      loginForm,
      isPasswordVisible,
      togglePasswordVisibility,
      getPasswordIcon,
      handleLogin,
      formErrorMsg,
      verificationCodeImg,
      getCaptcha,
      isLoading
    }
  }
})
