import http from '../../utils/request'

export const login_dev = (data: any) => {
  return http('/consumer/login', 'POST', data)
}

export const login_pro = (data: any) => {
  return http('/consumer/wechat/login', 'GET', data)
}