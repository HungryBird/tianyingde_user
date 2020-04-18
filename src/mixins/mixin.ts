import { Component } from '@tarojs/taro'

export default class Mixins extends Component<any, any>{
  // 跳转页面
  navigateTo(url: string, query: any = {}) {
    const type = Object.prototype.toString.call(query)
    if (type !== '[object MouseEvent]') {
      let queryUrl: string = ''
      for (const key in query) {
        queryUrl += `${key}=${query[key]}&`
      }
      queryUrl = queryUrl.split('').splice(0, queryUrl.length - 1).join('')
      Taro.navigateTo({
        url: `${url}?${queryUrl}`
      })
    } else {
      Taro.navigateTo({
        url
      })
    }
  }
  // 初始化页面list
  initList() {
    return new Promise(resolve => {
      const list = Object.assign({}, {
        data: [],
        total: 0,
        size: 10,
        page: 1,
        type: 'more',
        loading: false
      })
      this.setState({
        list
      })
      resolve()
    })
  }
}