import request from '@/utils/request'

// 查询生成表数据
export function listTable(query) {
  return request({
    url: '/gen/table/list',
    method: 'get',
    params: query
  })
}
// 查询db数据库列表
export function listDbTable(query) {
  return request({
    url: '/gen/table/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId) {
  return request({
    url: '/gen/table/' + tableId,
    method: 'get'
  })
}

// 增加代码生成信息
export function addGenTable(data) {
  return request({
    url: '/gen/table/add',
    method: 'post',
    data: data
  })
}

// 修改代码生成信息
export function updateGenTable(data) {
  return request({
    url: '/gen/table',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data) {
  return request({
    url: '/gen/table/importTable',
    method: 'post',
    params: data
  })
}

// 预览生成代码
export function previewTable(tableId) {
  return request({
    url: '/gen/table/preview/' + tableId,
    method: 'get'
  })
}

// 删除表数据
export function delTable(tableId) {
  return request({
    url: '/gen/table/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName) {
  return request({
    url: '/gen/table/genCode/' + tableName,
    method: 'get'
  })
}

// 从物理表同步
export function synchDbFrom(tableName) {
  return request({
    url: '/gen/table/synchDbFrom/' + tableName,
    method: 'get'
  })
}
//同步到物理表
export function synchDbTo(tableName) {
  return request({
    url: '/gen/table/synchDbTo/' + tableName,
    method: 'get'
  })
}

// 生成代码和数据库
export function createDbAndCode(tableName) {
  return request({
    url: '/gen/table/createDbAndCode/' + tableName,
    method: 'get'
  })
}

// 生成代码
export function createCode(tableName) {
  return request({
    url: '/gen/table/createCode/' + tableName,
    method: 'get'
  })
}