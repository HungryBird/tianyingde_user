import Taro from '@tarojs/taro'
import { getStorageSync, isEmpty, clearStorageSync } from '../utils/util'

export default function request(url: string, method: string | any = 'GET', data: any = {}, contentType: string = 'application/x-www-form-urlencoded') {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://api.jiayoufabao.com/api' : 'http://tyd.jongjun.cn/api'

  const getToken = () => {
    return getStorageSync('token')
  }

  return new Promise((resolve: any, reject: any) => {
    try{
      Taro.showLoading({
        title: '加载中...'
      })
      const token = getToken()
      console.log('request token: ', token)
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
