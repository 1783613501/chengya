import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    name:"login",
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: (resolve) => require(['@/views/features/redirect'], resolve),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user/center',
  },
  {
    path: '/edit',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'userEdit',
        component: (resolve) => require(['@/views/ShopManage/ShopList/Modules/index'], resolve),
        name: '编辑商家',
        meta: { title: '编辑商家' }
      },
      {
        path: 'taskEdit',
        component: (resolve) => require(['@/views/TaskManage/taskEdit'], resolve),
        name: '编辑任务',
        meta: { title: '编辑任务' }
      },
      {
        path: 'setMealEdit',
        component: (resolve) => require(['@/views/SetMealManage/taskEdit'], resolve),
        name: '编辑套餐',
        meta: { title: '编辑套餐' }
      },
      {
        path: 'rebateEdit',
        component: (resolve) => require(['@/views/RebateManage/taskEdit'], resolve),
        name: '编辑活动',
        meta: { title: '编辑活动' }
      },
      {
        path: 'areaGroupEdit',
        component: (resolve) => require(['@/views/AreaGroupManage/taskEdit'], resolve),
        name: '编辑群二维码',
        meta: { title: '编辑群二维码' }
      },
      {
        path: 'batchTaskImport',
        component: (resolve) => require(['@/views/TaskManage/batchTaskImportIndex'], resolve),
        name: '任务管理-批量新增',
        meta: { title: '任务管理-批量新增' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
