import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'logs/error/' + id,
    method: 'get'
  })
}

export function delAllError() {
  return request({
    url: 'logs/del/error',
    method: 'delete'
  })
}

export function delAllInfo() {
  return request({
    url: 'logs/del/info',
    method: 'delete'
  })
}
