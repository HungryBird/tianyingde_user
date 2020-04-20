import { observable } from 'mobx'
import { setStorage, getStorageSync } from '../utils/util'

const infoStore = observable({
  token: getStorageSync('token'),
  setToken(token: string) {
    return setStorage('token', token)
  },
  getTokenSync() {
    return getStorageSync('token')
  }
})

export default infoStore