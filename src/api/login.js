import request from '@/utils/request'

// 登录
export const login = (data) => {
    return request({
        url: '/system/login/common',
        method: 'post',
        data: data
    })
}

// 获取验证码
export const createImageCode = () => {
    return request({
        url: '/system/login/createImageCode',
        method: 'get'
    })
}

//获取配置信息
export const getConfig = () => {
    return "芒果"
}