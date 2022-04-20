import request from '@/utils/request'

// 查询teacher_fuc列表
export function listTeacher(query) {
  return request({
    url: '/work/teacher/list',
    method: 'get',
    params: query
  })
}

// 查询teacher_fuc详细
export function getTeacher(id) {
  return request({
    url: '/work/teacher/' + id,
    method: 'get'
  })
}

// 新增teacher_fuc
export function addTeacher(data) {
  return request({
    url: '/work/teacher',
    method: 'post',
    data: data
  })
}

// 修改teacher_fuc
export function updateTeacher(data) {
  return request({
    url: '/work/teacher/update',
    method: 'post',
    data: data
  })
}

// 删除teacher_fuc
export function delTeacher(id) {
  return request({
    url: '/work/teacher/' + id+'/remove',
    method: 'get'
  })
}

// 导出teacher_fuc
export function exportTeacher(query) {
  return request({
    url: '/work/teacher/export',
    method: 'get',
    params: query
  })
}