import Taro from '@tarojs/taro'
import { getBaseURL, getStorageSync } from '../../utils/util'

export function upload (filePath: any, name: string = 'file', formData: any = {}, headerParams: any = {}) {
  const baseURL = getBaseURL()
  const token = getStorageSync('token')
  const header = Object.assign({
    token
  }, headerParams)
  return Taro.uploadFile({
    filePath,
    url: `${baseURL}/consumer/upload/image`,
    name,
    formData,
    header
  })
}