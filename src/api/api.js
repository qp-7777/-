import request from '@/utils/request'

// 登录接口
export function getLogin(MethodName, data) {
  return request({
    url: `/GCLSFileServer/ServiceInterface?MethodName=${MethodName}`,
    method: 'post',
    data,
  })
}
