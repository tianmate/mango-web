import router from './router'
// import store from './store/test'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'
import { isRelogin } from './utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
 //  NProgress.start()
  // if (getToken()) {
  //   to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     if (store.getters.roles.length === 0) {
  //       isRelogin.show = true
  //       // 判断当前用户是否已拉取完user_info信息
  //       store.dispatch('GetInfo').then(() => {
  //         isRelogin.show = false
  //         store.dispatch('GenerateRoutes').then(accessRoutes => {
  //           // 根据roles权限生成可访问的路由表
  //           router.addRoutes(accessRoutes) // 动态添加可访问路由表
  //           next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
  //         })
  //       }).catch(err => {
  //           store.dispatch('LogOut').then(() => {
  //             Message.error(err)
  //             next({ path: '/' })
  //           })
  //         })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   // 没有token
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入

    const res=[];
    console.log(to.path)
    console.log(from.path)
   router.addRoutes([
       {
           path: '/pages/Index',
           component: () => import('./view/Index'),
           children:[
               {
                   path: '/pages/menu',
                   name: '菜单管理',
                   component: () => import('./view/system/menu/menu')
               },
               {
                   path: '/pages/role',
                   name: '角色管理',
                   component: () => import('./view/system/role/role')
               },
               {
                   path: '/pages/user',
                   name: '用户管理',
                   component: () => import('./view/system/user/user')
               },
               {
                   path: '/pages/gzh/keyword',
                   name: '关键词管理',
                   component: () => import('./view/work/gzh/keyword')
               },
               {
                   path: '/pages/gzh/plan',
                   name: '计划管理',
                   component: () => import('./view/work/gzh/plan')
               },
               {
                   path: '/pages/gzh/publicUser',
                   name: '菜单管理',
                   component: () => import('./view/work/gzh/publicUser')
               },
               {
                   path: '/pages/gzh/nightJoin',
                   name: '晚安计划管理',
                   component: () => import('./view/work/gzh/nightJoin')
               },
               {
                   path: '/pages/gzh/swag',
                   name: '交换管理',
                   component: () => import('./view/work')
               },
               {
                   path: '/pages/createCode',
                   name: '代码生成',
                   component: () => import('./view/system/gen/index')
               },
               {
                   path: '/tool/editTable',
                   // component: Layout,
                   // hidden: true,
                   // permissions: ['tool:gen:edit'],
                   name: 'GenEdit',
                   component: () => import('./view/system/gen/editTable')

               },
               {
                   path: '/user/profile',
                   // component: Layout,
                   // hidden: true,
                   // permissions: ['tool:gen:edit'],
                   name: 'GenEdit',
                   component: () => import('./view/system/user/profile/index')

               },

           ]
       },

   ])
       next()
  console.log('路由beforeEach')
  //   } else {
  //     next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
