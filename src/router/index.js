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
                name: '菜单管理',
                component: () => import('../pages/gzh/nightJoin')
            },
            {
                path: '/pages/gzh/swag',
                name: '菜单管理',
                component: () => import('../pages/gzh/swag')
            }
        ]
    },


]


const router = new VueRouter({
    routes
});

export default router