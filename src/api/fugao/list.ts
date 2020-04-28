import http from '../../utils/request'

export const golds = (data: any) => {
  return http('/consumer/users/obituaries/golds', 'GET', data)
}

export const gifts = (data: any) => {
  return http('/consumer/users/obituaries/gifts', 'GET', data)
}

export const notes = (data: any) => {
  return http('/consumer/users/obituaries/notes', 'GET', data)
}