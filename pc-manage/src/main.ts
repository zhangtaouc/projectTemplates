import { createApp } from 'vue'
import './style.less'
import 'vant/lib/index.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
