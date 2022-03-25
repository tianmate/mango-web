//保存文件的路由器
import VueRouter from 'vue-router'

import Vue from "vue";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../view/login')
    },
    // {
    //     path: '/pages/Index',
    //     component: () => import('../view/Index'),
    //     children:[
    //         {
    //             path: '/pages/menu',
    //             name: '菜单管理',
    //             component: () => import('../view/system/menu/menu')
    //         },
    //         {
    //             path: '/pages/role',
    //             name: '角色管理',
    //             component: () => import('../view/system/role/role')
    //         },
    //         {
    //             path: '/pages/user',
    //             name: '用户管理',
    //             component: () => import('../view/system/user/user')
    //         },
    //         {
    //             path: '/pages/gzh/keyword',
    //             name: '关键词管理',
    //             component: () => import('../view/work/gzh/keyword')
    //         },
    //         {
    //             path: '/pages/gzh/plan',
    //             name: '计划管理',
    //             component: () => import('../view/work/gzh/plan')
    //         },
    //         {
    //             path: '/pages/gzh/publicUser',
    //             name: '菜单管理',
    //             component: () => import('../view/work/gzh/publicUser')
    //         },
    //         {
    //             path: '/pages/gzh/nightJoin',
    //             name: '晚安计划管理',
    //             component: () => import('../view/work/gzh/nightJoin')
    //         },
    //         {
    //             path: '/pages/gzh/swag',
    //             name: '交换管理',
    //             component: () => import('../view/work')
    //         },
    //         {
    //             path: '/pages/createCode',
    //             name: '代码生成',
    //             component: () => import('../view/system/gen/index')
    //         },
    //         {
    //             path: '/tool/editTable',
    //             // component: Layout,
    //             // hidden: true,
    //             // permissions: ['tool:gen:edit'],
    //             name: 'GenEdit',
    //             component: () => import('../view/system/gen/editTable')
    //
    //         },
    //         {
    //             path: '/user/profile',
    //             // component: Layout,
    //             // hidden: true,
    //             // permissions: ['tool:gen:edit'],
    //             name: 'GenEdit',
    //             component: () => import('../view/system/user/profile/index')
    //
    //         },
    //
    //     ]
    // },


]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
});



export default router