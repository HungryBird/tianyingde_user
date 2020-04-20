import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { isEmpty } from '../../utils/util'
import { inject, observer } from '@tarojs/mobx'
import { login } from '../../api/login/login'
import './login.scss'


@inject('infoStore')
@observer
export default class Index extends Component {
  constructor(props: any) {
    super(props)
  }

  componentWillMount () {
    Taro.showLoading({
      title: ''
    })
    const { infoStore } = this.props
    if (isEmpty(infoStore.token)) {
      this.toLogin()
    } else {
      setTimeout(() => {
        Taro.hideLoading()
        Taro.navigateTo({
          url: '/pages/index/index'
        })
      }, 1500)
    }
    // console.log('infoStore.getStorageSync', infoStore.getStorageSync())
    
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toLogin() {
    const { infoStore } = this.props
    login({
      username: '13957474859',
      password: '123456'
    }).then((res: any) => {
      infoStore.setToken(res.meta.access_token).then(() => {
        Taro.hideLoading()
        Taro.navigateTo({
          url: '/pages/index/index'
        })
      })
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
    navigationBarTitleText: '登录'
  }

  render () {
    return (
      <View className='index' />
    )
  }
}
