import Taro from '@tarojs/taro'
import { getStorageSync, isEmpty, clearStorageSync } from '../utils/util'

export default function request(url: string, method: string | any = 'GET', data: any = {}, contentType: string = 'application/x-www-form-urlencoded') {
  console.log('url: ', url, 'method: ', method, 'data: ', data)
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://tyd.jongjun.cn/api' : 'http://tyd.jongjun.cn/api'
  return new Promise((resolve: any, reject: any) => {
    try{
      Taro.showLoading({
        title: '加载中...'
      })
      const token = getStorageSync('token')
      Taro.request({
        url: `${baseURL}${url}`,
        method,
        data,
        header: {
          Authorization: isEmpty(token) ? '' : token,
          'content-type': contentType
        },
        success(res: any) {
          Taro.hideLoading()
          resolve(res.data)
        },
        fail(err: any) {
          const { status } = err
          if (status === 401 || status === 420) {
            clearStorageSync()
            Taro.navigateTo({
              url: '/pages/login/login'
            })
          }
          Taro.hideLoading()
          Taro.showLoading({
            title: err.statusText
          })
          setTimeout(() => {
            Taro.hideLoading()
          }, 2000)
          reject(err)
        }
      })
    } catch (err) {
      console.error(err)
    }
  })
}
