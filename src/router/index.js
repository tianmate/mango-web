//保存文件的路由器
import VueRouter from 'vue-router'

import Vue from "vue";
Vue.use(VueRouter)
import Layout from '@/layout'

const routes = [
    {
        path: '/login',
        component: () => import('../view/login')
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/view/index'),
                name: '首页',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            },
            {
                path: '/user/profile',
                name: '个人中心',
                component: () => import('../view/system/user/profile/index'),
                meta: { title: '个人中心', icon: 'user', affix: true }

            },
            {
                path: '/tool/editTable',
               // hidden: true,
                component: () => import('../view/system/gen/editTable'),
                name: '编辑代码生成',
                meta: { title: '修改生成配置', activeMenu: '/tool/gen' }

            },
            {
                path: '/tool/addTable',
                component: () => import('../view/system/gen/addTable'),
                name: '新增代码生成',
                meta: { title: '修改生成配置', activeMenu: '/tool/gen' }

            },
        ]
    },


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