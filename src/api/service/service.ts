import http from '../../utils/request'

export const addServiceOrder = (data: any) => {
  return http('/consumer/services/orders', 'POST', data)
}

export const serviceOrders = (data: any) => {
  return http('/consumer/services/orders', 'GET', data)
}
