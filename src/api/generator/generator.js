import request from '@/utils/request'

export function getAllTable() {
  return request({
    url: 'generator/tables/all',
    method: 'get'
  })
}

export function generator(tableName, type) {
  return request({
    url: 'generator/' + tableName + '/' + type,
    method: 'post',
    responseType: type === 2 ? 'blob' : ''
  })
}

export function save(data) {
  return request({
    url: 'generator',
    data,
    method: 'put'
  })
}

export function sync(tables) {
  return request({
    url: 'generator/sync',
    method: 'post',
    data: tables
  })
}

