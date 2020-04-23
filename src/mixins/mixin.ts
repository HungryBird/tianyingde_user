import { Component } from '@tarojs/taro'

export default class Mixins extends Component<any, any>{
  // 跳转页面
  navigateTo(url: string, query: any = {}) {
    console.log('query: ', query)
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
  // 处理获取的列表数据
  handleDefaultList(res: any) {
    return new Promise((resolve: any) => {
      const data = this.state.list.data.concat(res.data)
      const list = Object.assign({}, this.state.list, {
        data,
        page: this.state.list.page + 1,
        total: res.meta.page_info.total,
        type: this.state.list.data.length === this.state.list.total ? 'noMore' : 'more'
      })
      this.setState({
        list
      }, () => {
        resolve()
      })
    })
  }
}