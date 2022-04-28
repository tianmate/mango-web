import request from '@/utils/request'

// 查询芒果管理列表
export function listStudent(query) {
  return request({
    url: '/work/student/list',
    method: 'get',
    params: query
  })
}

// 查询芒果管理详细
export function getStudent(id) {
  return request({
    url: '/work/student/' + id,
    method: 'get'
  })
}

// 新增芒果管理
export function addStudent(data) {
  return request({
    url: '/work/student',
    method: 'post',
    data: data
  })
}

// 修改芒果管理
export function updateStudent(data) {
  return request({
    url: '/work/student/update',
    method: 'post',
    data: data
  })
}

// 删除芒果管理
export function delStudent(id) {
  return request({
    url: '/work/student/remove/' + id,
    method: 'get'
  })
}

// 导出芒果管理
export function exportStudent(query) {
  return request({
    url: '/work/student/export',
    method: 'get',
    params: query
  })
}