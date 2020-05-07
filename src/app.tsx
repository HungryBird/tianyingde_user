import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import infoStore from './store/info'
import { Provider } from '@tarojs/mobx'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

const store = {
  infoStore
}

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/login/login',
      'pages/index/index',
      'pages/mall/mall',
      'pages/mine/mine',
      'pages/news/news',
      'pages/cart/cart',
      'pages/good/good',
      'pages/createOrder/createOrder',
      'pages/address/address',
      'pages/binyi/binyi',
      'pages/zangyi/zangyi',
      'pages/jisi/jisi',
      'pages/service/list',
      'pages/goods/list',
      'pages/fugao/fugao',
      'pages/fugao/dianjin',
      'pages/fugao/liwu',
      'pages/fugao/liuyan',
      'pages/user/set',
      'pages/wallet/wallet',
      'pages/online/list',
      'pages/fugao/add',
      'pages/fugao_service/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '天胤德',
      navigationBarTextStyle: 'black'
    }
    // tabBar: {
    //   list: [
    //     {
    //       pagePath: '/pages/index/index',
    //       text: '首页',
    //       iconPath: '/assets/images/tabBar/shouye_guan.png',
    //       selectedIconPath: '/assets/images/tabBar/shouye_zhong.png'
    //     },
    //     {
    //       pagePath: '/pages/mall/mall',
    //       text: '商城',
    //       iconPath: '/assets/images/tabBar/shangcheng_guan.png',
    //       selectedIconPath: '/assets/images/tabBar/shangcheng_zhong.png'
    //     },
    //     {
    //       pagePath: '/pages/mine/mine',
    //       text: '我的',
    //       iconPath: '/assets/images/tabBar/wode_guan.png',
    //       selectedIconPath: '/assets/images/tabBar/wode_zhong.png'
    //     }
    //   ],
    //   backgroundColor: '#67B2AE',
    //   selectedColor: '#172D2B',
    //   color: '#46918D'
    // }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
