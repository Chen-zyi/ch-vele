import { createApp } from 'vue'
import App from './App.vue'
// 重置样式
import './style.scss'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入 element-plus 插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import router from './router'
import pinia from './store'

const app = createApp(App)

// 安装 element-plus 插件
app.use(ElementPlus)
// app.use(router)
app.use(pinia)
// 将应用挂载到挂载点上
app.mount('#app')
