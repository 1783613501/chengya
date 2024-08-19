// 适配 Nginx 反向代理
const baseUrl = ''
const api = {
  state: {
    deployUploadApi: baseUrl + '',
    databaseUploadApi: baseUrl + '',
    imagesUploadApi: baseUrl + '',
    updateAvatarApi: baseUrl + '',
    qiNiuUploadApi: baseUrl + '',
    sqlApi: baseUrl + '',
    swaggerApi: baseUrl + '',
    fileUploadApi: baseUrl + '',
    baseApi: baseUrl
  }
}

export default api
