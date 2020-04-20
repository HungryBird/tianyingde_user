import http from '../../utils/request'

export const login = (data: any) => {
  return http('/consumer/login', 'POST', data)
}