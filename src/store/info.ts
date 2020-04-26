import { observable } from 'mobx'
import { setStorageSync, getStorageSync } from '../utils/util'

const infoStore = observable({
  token: getStorageSync('token'),
  openid: getStorageSync('openid'),
  setToken(token: string) {
    return new Promise((resolve: any) => {
      setStorageSync('token', token)
      resolve()
    })
  },
  getTokenSync() {
    return getStorageSync('token')
  },
  setOpenid(openid: string) {
    return new Promise((resolve: any) => {
      setStorageSync('openid', openid)
      resolve()
    })
  }
})

export default infoStore