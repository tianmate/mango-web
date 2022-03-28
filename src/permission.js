import router from './router'
// import store from './store/test'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'
import { isRelogin } from './utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

let getRouter;
let routers=[
        {
            path: '/pages/Index',
            component: () => import('./view/Index'),
            children:[
                {
                    path: '/pages/menu',
                    name: '菜单管理',
               //     component: () => import('./view/system/menu/index')
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

    ]
function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    router.addRoutes(getRouter) //动态添加路由
    global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));

}
function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
          if (route.component === 'Layout') {//Layout组件特殊处理
                //route.component = Layout
            } else {
               // route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}
router.beforeEach((to, from, next) => {

    if (!getRouter) {//不加这个判断，路由会陷入死循环
        if (!getObjArr('router')) {

                getRouter = routers//后台拿到路由
             //   saveObjArr('router', getRouter) //存储路由到localStorage

                routerGo(to, next)//执行路由跳转方法

        } else {//从localStorage拿到了路由
            getRouter = getObjArr('router')//拿到路由
            routerGo(to, next)
        }
    } else {
        next()
    }


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
    // console.log(to.path)
    // console.log(from.path)
   // router.addRoutes([
   //     {
   //         path: '/pages/Index',
   //         component: () => import('./view/Index'),
   //         children:[
   //             {
   //                 path: '/pages/menu',
   //                 name: '菜单管理',
   //                 component: () => import('./view/system/menu/menu')
   //             },
   //             {
   //                 path: '/pages/role',
   //                 name: '角色管理',
   //                 component: () => import('./view/system/role/role')
   //             },
   //             {
   //                 path: '/pages/user',
   //                 name: '用户管理',
   //                 component: () => import('./view/system/user/user')
   //             },
   //             {
   //                 path: '/pages/gzh/keyword',
   //                 name: '关键词管理',
   //                 component: () => import('./view/work/gzh/keyword')
   //             },
   //             {
   //                 path: '/pages/gzh/plan',
   //                 name: '计划管理',
   //                 component: () => import('./view/work/gzh/plan')
   //             },
   //             {
   //                 path: '/pages/gzh/publicUser',
   //                 name: '菜单管理',
   //                 component: () => import('./view/work/gzh/publicUser')
   //             },
   //             {
   //                 path: '/pages/gzh/nightJoin',
   //                 name: '晚安计划管理',
   //                 component: () => import('./view/work/gzh/nightJoin')
   //             },
   //             {
   //                 path: '/pages/gzh/swag',
   //                 name: '交换管理',
   //                 component: () => import('./view/work')
   //             },
   //             {
   //                 path: '/pages/createCode',
   //                 name: '代码生成',
   //                 component: () => import('./view/system/gen/index')
   //             },
   //             {
   //                 path: '/tool/editTable',
   //                 // component: Layout,
   //                 // hidden: true,
   //                 // permissions: ['tool:gen:edit'],
   //                 name: 'GenEdit',
   //                 component: () => import('./view/system/gen/editTable')
   //
   //             },
   //             {
   //                 path: '/user/profile',
   //                 // component: Layout,
   //                 // hidden: true,
   //                 // permissions: ['tool:gen:edit'],
   //                 name: 'GenEdit',
   //                 component: () => import('./view/system/user/profile/index')
   //
   //             },
   //
   //         ]
   //     },
   //
   // ])
       next()
  // console.log('路由beforeEach')
  //   } else {
  //     next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
