import request from '@/utils/request'

// 查询课程管理列表
export function listCourse(query) {
  return request({
    url: '/work/course/list',
    method: 'get',
    params: query
  })
}

// 查询课程管理详细
export function getCourse(id) {
  return request({
    url: '/work/course/' + id,
    method: 'get'
  })
}

// 新增课程管理
export function addCourse(data) {
  return request({
    url: '/work/course',
    method: 'post',
    data: data
  })
}

// 修改课程管理
export function updateCourse(data) {
  return request({
    url: '/work/course/update',
    method: 'post',
    data: data
  })
}

// 删除课程管理
export function delCourse(id) {
  return request({
    url: '/work/course/remove/' + id,
    method: 'get'
  })
}

// 导出课程管理
export function exportCourse(query) {
  return request({
    url: '/work/course/export',
    method: 'get',
    params: query
  })
}