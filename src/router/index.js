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
                component: () => import('@/view'),
                name: 'Index',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            },
            {
                path: '/user/profile',
                name: 'GenEdit',
                component: () => import('../view/system/user/profile/index'),
                meta: { title: '个人中心', icon: 'dashboard', affix: true }

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