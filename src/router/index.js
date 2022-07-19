//保存文件的路由器
import Router from 'vue-router'

import Vue from "vue";
Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
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
                meta: { title: '修改生成配置', activeMenu: '/system/tool/gen' }

            },
            {
                path: '/tool/addTable',
                component: () => import('../view/system/gen/addTable'),
                name: '新增代码生成',
                meta: { title: '修改生成配置', activeMenu: '/system/tool/gen' }

            },
        ]
    },
    {
        path: '/monitor/job-log',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('../view/system/quartz/log'),
                name: '定时任务日志',
                meta: { title: '定时任务日志', activeMenu: '/system/quartz/job' }
            }
        ]
    },
    {
        path: '/system/dict-data',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'index/:dictId(\\d+)',
                component: () => import('../view/system/dict/data'),
                name: '字典数据',
                meta: { title: '字典数据', activeMenu: '/system/dict' }
            }
        ]
    },


]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});



// export default constantRoutes
