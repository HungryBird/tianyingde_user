import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { isEmpty, getStorageSync, setStorageSync } from '../../utils/util'
import { inject, observer } from '@tarojs/mobx'
import { login } from '../../api/login/login'
import './login.scss'


@inject('infoStore')
@observer
export default class Index extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  componentWillMount () {
    Taro.showLoading({
      title: ''
    })
    const { infoStore } = this.props
    const token = getStorageSync('token')
    console.log('infoStore.token: ', infoStore.token)
    console.log('get token', getStorageSync('token'))
    if (isEmpty(token)) {
      this.toLogin()
    } else {
      console.log('getStorageSync: ', getStorageSync('token'))
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
      setStorageSync('token', res.meta.access_token)
      console.log('login token', getStorageSync('token'))
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
