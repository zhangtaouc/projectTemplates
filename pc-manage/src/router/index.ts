// import { getUserInfoApi } from '@/api'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import Layout from '@components/layout/index.vue'
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    keepAlive?: boolean
  }
}

const routes = [
  // 独立路由 - 不需要布局的页面
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '用户登录',
      layout: false // 标记不需要布局
    }
  },

  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/test1', // 使用相对路径
        name: 'Test1',
        component: () => import('@/views/test1.vue'),
        meta: {
          title: '测试1'
        }
      },
      {
        path: '/visitPage', // 使用相对路径
        name: 'VisitPage',
        component: () => import('@/views/visitPage/visitPage.vue'),
        meta: {
          title: '信息录入'
        }
      },
      {
        path: '/test2', // 使用相对路径
        name: 'Test2',
        component: () => import('@/views/test2.vue'),
        meta: {
          title: '测试2'
        }
      }
    ]
  },

  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      layout: false
    }
  }
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

const isRealData = false
router.beforeEach(async (to, _from, next) => {
  // let userInfo = {} as any
  // if (!isRealData) {
  //   userInfo = await getUserInfoApi()
  //   isRealData = !!userInfo
  // }
  if (isRealData && to.path !== '/login') {
    next({
      path: '/login',
      query: { to: encodeURIComponent(to.fullPath) }
    })
  } else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
})

export default router
