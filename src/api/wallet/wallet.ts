import http from '../../utils/request'

export const getLogs = (data: any) => {
  return http('/consumer/users/balances/logs', 'GET', data)
}