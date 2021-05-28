import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Index from "../views/login/index"

export const constantRoutes = [
  {
    path: '/',
    name: "index",
    component: Index,
    // component: () => import('@/views/login/index'),
  },
  {
    path: '/account',
    name: "account",
    component: () => import('@/views/Account'),
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
