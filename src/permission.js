import router from './router'
import { getRouters } from '@/api/menu'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'
import { isRelogin } from './utils/request'
import Layout from '@/layout/index'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

let getRouter;
let routers=[
        {
            path: '/',
            component: () => import(Layout),
            children:[
                {
                    path: '/pages/menu',
                    name: '菜单管理',
                    component: () => import('./view/system/menu/index')
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


            ]
        },

    ]

router.beforeEach((to, from, next) => {

    if (getToken()){
        if (!getRouter) {//不加这个判断，路由会陷入死循环
            if (!getObjArr('router')) {

               // getRouter = routers//后台拿到路由
                //   saveObjArr('router', getRouter) //存储路由到localStorage

                routerGo(to, next)//执行路由跳转方法

            } else {//从localStorage拿到了路由
                getRouter = getObjArr('router')//拿到路由
                routerGo(to, next)
            }
        } else {
            next()
        }
    }else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login`) // 否则全部重定向到登录页
            // NProgress.done()
        }
    }

})

function routerGo(to, next) {
    getRouters().then(res=>{
        const sdata = JSON.parse(JSON.stringify(res.datas))
        getRouter = filterAsyncRouter(sdata) //过滤路由|转换为路由对象
        router.addRoutes(getRouter) //动态添加路由
        // global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
        next({ ...to, replace: true })
        }
    )

}


function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) { //遍历后台传来的路由字符串，转换为组件对象

    const accessedRouters = asyncRouterMap.filter(route => {

        if (type && route.children) {
            route.children = filterChildren(route.children)
        }

        if (route.component) {
          if (route.component === 'Layout') {//Layout组件特殊处理
                route.component = Layout
            } else {
               // route.component = import('@/view/system/'+route.component)
              route.component = loadView(route.component)
            }
        }

        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }

        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type)
        } else {
            delete route['children']
            delete route['redirect']
        }

        return true
    })

    return accessedRouters
}


function filterChildren(childrenMap, lastRouter = false) {
    var children = []
    childrenMap.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView' && !lastRouter) {
                el.children.forEach(c => {
                    c.path = el.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastRouter) {
            el.path = lastRouter.path + '/' + el.path
        }
        children = children.concat(el)
    })
    return children
}

export const loadView = (view) => {
    if (process.env.NODE_ENV === 'development') {

        return (resolve) => require([`@/view/system/${view}`], resolve)
    } else {
        // 使用 import 实现生产环境的路由懒加载
        return () => import(`@/view/system/user/user`)
    }
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));

}
router.afterEach(() => {
  NProgress.done()
})
