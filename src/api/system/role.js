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
export function editRole(query) {
    return request({
        url: '/system/role/update',
        method: 'post',
        params: query
    })
}

// 增加菜单
export function addRole(query) {
    return request({
        url: '/system/role/add',
        method: 'post',
        params: query
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

