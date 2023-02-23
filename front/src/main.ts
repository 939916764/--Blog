import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router/index'
import 'element-plus/dist/index.css'
import imgLazy from '@/utils/directives'

createApp(App).use(router).use(imgLazy).mount('#app')
