import request from '@/utils/request'

// 查询系统配置信息
export function getConfigInfo() {
    return request({
        url: '/common/config/info',
        method: 'get'
    })
}