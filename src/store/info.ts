import { observable } from 'mobx'
import { setStorageSync, getStorageSync } from '../utils/util'

const infoStore = observable({
  token: getStorageSync('token'),
  setToken(token: string) {
    return new Promise((resolve: any) => {
      setStorageSync('token', token)
      console.log('getTokenSync: ', this.getTokenSync())
      resolve()
    })
  },
  getTokenSync() {
    return getStorageSync('token')
  }
})

export default infoStore