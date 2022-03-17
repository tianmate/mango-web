import request from '@/utils/request'

// 获取路由
export function getUsers(data){
    return request({
        url: '/system/account/getList',
        method: 'post',
        data: data
    })
}