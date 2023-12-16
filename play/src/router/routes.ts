import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('@/views/**/*.vue')
const compMap = new Map([
  ['ChForm', 'form'],
  ['ChTable', 'table'],
])

const createRoutes = (compMap: Map<string, string>): Array<RouteRecordRaw> => {
  const routesArray: Array<RouteRecordRaw> = []
  for (const [ChName, name] of compMap.entries()) {
    routesArray.push({
      path: `/${name}`,
      name: ChName,
      component: modules[`/src/views/${name}.vue`],
      meta: {
        title: ChName,
        hidden: false,
      },
    })
  }
  return routesArray
}

export const layoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard.vue'),
    meta: {
      title: 'Dashboard',
      hidden: false,
    },
  },
  ...createRoutes(compMap),
]

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
    },
    children: layoutRoutes,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
