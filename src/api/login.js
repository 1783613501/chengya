import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    // url: 'api/tbms/b/login/on',
    url: 'tbms/b/login/on',
    method: 'post',
    data: {
      accountName:username,
      pswd:password
    }
  })
}

export function getInfo() {
  // return request({
  //   url: 'auth/info',
  //   method: 'get'
  // })
}

export function getCodeImg() {
  // return request({
  //   url: 'auth/code',
  //   method: 'get'
  // })
}

export function logout() {
  // return request({
  //   url: 'auth/logout',
  //   method: 'delete'
  // })
}
