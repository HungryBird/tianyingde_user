import Taro from '@tarojs/taro'

export const getStorage = (key: string) => {
  return new Promise((resolve: any) => {
    Taro.getStorage({
      key,
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export const setStorage = (key: string, data: any) => {
  return new Promise((resolve: any) => {
    Taro.setStorage({
      key,
      data,
      success() {
        resolve()
      }
    })
  })
}

export const getStorageSync = (key: string) => {
  return Taro.getStorageSync(key)
}

export const setStorageSync = (key: string, data: any) => {
  Taro.setStorageSync(key, data)
}

export const removeStorageSync = (key: string) => {
  Taro.removeStorageSync(key)
}

export const removeStorage = (key: string) => {
  return new Promise((resolve: any) => {
    Taro.removeStorage({
      key,
      success() {
        resolve()
      }
    })
  })
}

export const clearStore = () => {
  return new Promise((resolve: any) => {
    Taro.clearStorage({
      success() {
        console.log('chengg')
        resolve()
      },
      complete() {
        console.log('完成')
      },
      fail() {
        console.log('失败')
      }
    })
  })
}

export const clearStorageSync = () => {
  Taro.clearStorageSync()
}

export const isEmpty = (data: any) => {
  const type = getType(data)
  if (type === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
  if (type === 'array') {
    return data.length === 0
  }
  if (type === 'set' || type === 'weakset' || type === 'map' || type === 'weakmap') {
    return data.size === 0
  }
  if (type === 'number' || type === 'boolean') return false
  return !data
}

export const getType = (data: any) => {
  const _dict = {
    '[object Object]': 'object',
    '[object String]': 'string',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Symbol]': 'symbol',
    '[object Regex]': 'regExp',
    '[object Set]': 'set',
    '[object Function]': 'function',
    '[object Map]': 'map',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object WeakSet]': 'weakset',
    '[object WeakMap]': 'weakmap',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object MouseEvent]': 'mouseEvent'
  }
  return _dict[Object.prototype.toString.call(data)]
}