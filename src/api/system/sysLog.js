import request from '@/utils/request'

// 查询日志管理列表
export function listSysLog(query) {
  return request({
    url: '/system/sysLog/list',
    method: 'get',
    params: query
  })
}

// 查询日志管理详细
export function getSysLog(id) {
  return request({
    url: '/system/sysLog/' + id,
    method: 'get'
  })
}

// 新增日志管理
export function addSysLog(data) {
  return request({
    url: '/system/sysLog',
    method: 'post',
    data: data
  })
}

// 修改日志管理
export function updateSysLog(data) {
  return request({
    url: '/system/sysLog/update',
    method: 'post',
    data: data
  })
}

// 删除日志管理
export function delSysLog(id) {
  return request({
    url: '/system/sysLog/remove/' + id,
    method: 'get'
  })
}

// 导出日志管理
export function exportSysLog(query) {
  return request({
    url: '/system/sysLog/export',
    method: 'get',
    params: query
  })
}
