import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: 'roles/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'roles',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'roles/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: 'roles/level',
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: 'roles',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'roles',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: 'roles/menu',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, editMenu, getLevel }
