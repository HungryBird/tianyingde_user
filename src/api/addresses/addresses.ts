import http from '../../utils/request'

export const addresses = (data: any) => {
  return http('/consumer/addresses', 'GET', data)
}

export const addAddress = (data: any) => {
  return http('/consumer/addresses', 'POST', data)
}

export const updateAddress = (data: any) => {
  const id = data.id
  return http(`/consumer/addresses/${id}`, 'PUT', data)
}

export const deleteAddress = (id: string) => {
  return http(`/consumer/addresses/${id}`, 'DELETE')
}

export const addressInfo = (id: string) => {
  return http(`/consumer/addresses/${id}`, 'GET', { id })
}
