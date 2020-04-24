import { observable } from 'mobx'
import { setStorageSync, getStorageSync } from '../utils/util'

const infoStore = observable({
  token: getStorageSync('token'),
  setToken(token: string) {
    return new Promise((resolve: any) => {
      console.log('store set token：', token)
      setStorageSync('token', token)
      resolve()
    })
  },
  getTokenSync() {
    return getStorageSync('token')
  }
})

export default infoStore