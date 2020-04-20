import http from '../../utils/request'

export const articles = (data) => {
  return http('/consumer/articles', 'POST', data)
}