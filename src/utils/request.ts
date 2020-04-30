import Taro from '@tarojs/taro'
import { getStorageSync, isEmpty, clearStorageSync, getBaseURL } from '../utils/util'

export default function request(url: string, method: string | any = 'GET', data: any = {}, contentType: string = 'application/x-www-form-urlencoded') {
  
  const baseURL = getBaseURL()

  const getToken = () => {
    return getStorageSync('token')
  }

  return new Promise((resolve: any, reject: any) => {
    try{
      Taro.showLoading({
        title: '加载中...'
      })
      const token = getToken()
      Taro.request({
        url: `${baseURL}${url}`,
        method,
        data,
        cache: 'no-cache',
        header: {
          Authorization: isEmpty(token) ? '' : token,
          'content-type': contentType
        },
        success(res: any) {
          if (res.data.returnCode >= 200 && res.data.returnCode < 300) {
            Taro.hideLoading()
            resolve(res.data)
          } else {
            Taro.showToast({
              icon: 'none',
              title: res.data.message,
              duration: 2000
            })
            reject(res)
          }
        },
        fail(err: any) {
          const { status } = err
          if (status === 401 || status === 420) {
            clearStorageSync()
            Taro.navigateTo({
              url: '/pages/login/login?redirect=login'
            })
          } else {
            Taro.hideLoading()
          }
          reject(err)
        }
      })
    } catch (err) {
      console.error(err)
    }
  })
}
