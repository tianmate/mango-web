import request from '@/utils/request'


// 查询菜单列表
export function listRole(query) {
    return request({
        url: '/system/role/getList',
        method: 'post',
        params: query
    })
}

// 编辑菜单
export function editRole(data) {
    return request({
        url: '/system/role/edit',
        method: 'post',
        data: data
    })
}

// 增加角色
export function addRole(data) {
    return request({
        url: '/system/role/add',
        method: 'post',
        data: data
    })
}

// 获取角色菜单
export function getRoleMenu(data) {
    return request({
        url: '/system/role/getRoleMenu',
        method: 'post',
        data: data
    })
}

// 获取菜单树
export const AllTree = () => {
    return request({
        url: '/system/menu/AllTree',
        method: 'get'
    })
}