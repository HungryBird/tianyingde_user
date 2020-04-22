import http from '../../utils/request'

export const goods = (data: any) => {
  return http('/consumer/goods', 'GET', data)
}

export const good = (id: string) => {
  return http(`/consumer/goods/${id}`, 'GET')
}

export const orders = (data: any) => {
  return http('/consumer/goods/orders', 'GET', data)
}

export const addOrder = (data: any) => {
  return http('/consumer/goods/orders', 'POST', data)
}

export const cancelOrder = (id: string) => {
  return http(`/consumer/goods/${id}`, 'PUT')
}

export const deleteOrder = (id: string) => {
  return http(`/consumer/goods/${id}`, 'DELETE')
}

export const carts = () => {
  return http('/consumer/carts', 'GET')
}

export const addToCart = (data: any) => {
  return http('/consumer/carts', 'POST', data)
}