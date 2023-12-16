import { createApp } from 'vue'
import App from './App.vue'
// 引入重置样式
import '@/style/reset.scss'
// 导入公共样式
import '@/style/index.scss'
import 'uno.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import router from './router'

const app = createApp(App)

// 安装 element-plus 插件
app.use(ElementPlus).use(router)
// 将应用挂载到挂载点上
app.mount('#app')
