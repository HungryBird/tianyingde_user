import http from '../../utils/request'

export const getInfo = (data: any) => {
  return http('/consumer/users/info', 'GET', data)
}

export const userSave = (data: any) => {
  return http('/consumer/users', 'POST', data)
}

export const userInfo = () => {
  return http('/consumer/users/info', 'get')
}