import http from '../../utils/request'

export const addresses = (data: any) => {
  return http('/consumer/addresses', 'GET', data)
}
