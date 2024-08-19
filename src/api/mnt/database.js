import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'database',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'database',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'database',
    method: 'put',
    data
  })
}

export function testDbConnection(data) {
  return request({
    url: 'database/testConnect',
    method: 'post',
    data
  })
}

export default { add, edit, del, testDbConnection }
