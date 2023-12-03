import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

// 创建路由实例
const router = createRouter({
  // 路由模式 hash
  history: createWebHashHistory(),
  routes: [] as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
