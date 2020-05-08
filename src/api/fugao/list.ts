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

export const obituaries = (data: any) => {
  return http('/consumer/users/obituaries', 'GET', data)
}

export const deleteObituarie = (data: any) => {
  return http(`/consumer/obituaries/${data.id}`, 'DELETE')
}

export const accepts = (data: any) => {
  return http('/consumer/obituaries/accepts', 'GET', data)
}

export const updateAccept = (data: any) => {
  return http('/consumer/obituaries/accepts', 'PUT', data)
}

export const addObituarie = (data: any) => {
  return http('/consumer/obituaries', 'POST', data)
}

export const updateObituarie = (data: any) => {
  const id = data.id
  return http(`/consumer/obituaries/${id}`, 'PUT', data)
}

export const getFugao = (data: any) => {
  const id = data.id
  return http(`/consumer/obituaries/${id}`, 'GET')
}