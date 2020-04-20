import Taro from '@tarojs/taro'
import { getStorageSync, isEmpty, clearStorageSync } from '../utils/util'

export default function request(url: string, method: string | any = 'GET', data: any = {}, contentType: string = 'application/x-www-form-urlencoded') {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://tyd.jongjun.cn/api' : 'http://tyd.jongjun.cn/api'
  return new Promise((resolve: any, reject: any) => { 
    const token = getStorageSync('token')
    console.log('token: ', token)
    Taro.request({
      url: `${baseURL}${url}`,
      method,
      data,
      header: {
        Authorization: isEmpty(token) ? '' : token,
        'content-type': contentType
      },
      success(res: any) {
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
        Taro.showToast({
          title: err.statusText,
          icon: 'none',
          duration: 2000
        })
        reject(err)
      }
    })
  })
}
