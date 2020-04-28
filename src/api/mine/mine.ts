import http from '../../utils/request'

export const getCustomer = () => {
  return http('/consumer/contact', 'GET')
}