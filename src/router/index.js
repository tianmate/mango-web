//保存文件的路由器
import VueRouter from 'vue-router'

import Vue from "vue";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../pages/login')
    },
    {
        path: '/pages/Index',
        component: () => import('../pages/Index'),
        children:[
            {
                path: '/pages/menu',
                name: '菜单管理',
                component: () => import('../pages/menu/menu')
            },
            {
                path: '/pages/role',
                name: '角色管理',
                component: () => import('../pages/role/role')
            },
            {
                path: '/pages/user',
                name: '用户管理',
                component: () => import('../pages/user/user')
            },
            {
                path: '/pages/gzh/keyword',
                name: '关键词管理',
                component: () => import('../pages/gzh/keyword')
            },
            {
                path: '/pages/gzh/plan',
                name: '计划管理',
                component: () => import('../pages/gzh/plan')
            },
            {
                path: '/pages/gzh/publicUser',
                name: '菜单管理',
                component: () => import('../pages/gzh/publicUser')
            },
            {
                path: '/pages/gzh/nightJoin',
                name: '晚安计划管理',
                component: () => import('../pages/gzh/nightJoin')
            },
            {
                path: '/pages/gzh/swag',
                name: '交换管理',
                component: () => import('../pages/work/index')
            },
            {
                path: '/pages/createCode',
                name: '代码生成',
                component: () => import('../pages/gen/index')
            },
            {
                path: '/tool/gen-edit',
                // component: Layout,
                // hidden: true,
                // permissions: ['tool:gen:edit'],
                children: [
                    {
                        path: '/index/:tableId(\\d+)',
                        component: () => import('../pages/gen/index'),
                        name: 'GenEdit',
                        // meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
                    }
                ]
            },

        ]
    },


]


const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
});



export default router