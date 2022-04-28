import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/system/menu/getRouters',
    method: 'get'
  })
}

// 获取菜单树根据角色id
export const tree = () => {
  return request({
    url: '/system/menu/tree',
    method: 'post'
  })
}

