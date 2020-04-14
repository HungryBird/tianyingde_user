import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Tabbar from '../../components/tabBar/tabBar'
import './index.scss'

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goPages(url: string) {
    Taro.navigateTo({
      url
    })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <View className="inner">
          <View className="content"></View>
          <Tabbar active="home" />
        </View>
      </View>
    )
  }
}
