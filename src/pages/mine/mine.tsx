import Taro, { Config } from '@tarojs/taro'
import Mixins from '../../mixins/mixin'
import { View, Text, Image } from '@tarojs/components'
import { getInfo } from '../../api/user/user'
import { getCustomer } from '../../api/mine/mine'
import TabBar from '../../components/TabBar/TabBar'
import './mine.scss'
import ShezhiIcon from '../../assets/images/mine/shezhi.png'
import QianbaoIcon from '../../assets/images/mine/qianbao.png'
import bgImg from '../../assets/images/mine/ditubeij.png'
import MenuListItem from '../../components/MenuList/MenuListItem'
import Icon1 from '../../assets/images/mine/chaxun.png'
import Icon2 from '../../assets/images/mine/fuwudingdan.png'
import Icon3 from '../../assets/images/mine/shangpdingdan.png'
import Icon4 from '../../assets/images/mine/lianxikefu.png'

export default class Index extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      mobile: '',
      user: {
        portrait: '',
        username: '',
        nickname: '',
        money: 0,
        balance: {
          amount: 0,
          locked_amount: 0
        }
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    getInfo({}).then((res: any) => {
      this.setState({
        user: res.data
      })
    })
    getCustomer().then((res: any) => {
      this.setState({
        mobile: res.data.contact_mobile
      })
    })
   }

  componentDidHide () { }

  contact = () => {
    const mobile = `tel:${this.state.mobile}`
    window.location.href = mobile
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的'
  }

  render () {
    const menus = [
      {
        label: '讣告查询',
        path: '/pages/fugao/fugao',
        icon: Icon1
      },
      {
        label: '服务订单',
        path: '/pages/service/list',
        icon: Icon2
      },
      {
        label: '商品订单',
        path: '/pages/goods/list',
        icon: Icon3
      }
    ]

    return (
      <View className='page-main mine'>
        <View className='main'>
          <View className='header'>
            <View className='top'>
              <View className='page-title page-title--position left'>
                个人中心
              </View>
              <View className='icon page-title--position right shezhi'>
                <Image src={ShezhiIcon} mode='widthFix' onClick={this.navigateTo.bind(this, '/pages/user/set')} />
              </View>
              <Image mode='widthFix' src={this.state.user.avatar} className='portrait' />
              <Text className='username'>{ this.state.user.nickname }</Text>
            </View>
            <View className='bottom' onClick={this.navigateTo.bind(this, `/pages/wallet/wallet?amount=${this.state.user.balance.amount}&locked_amount=${this.state.user.balance.locked_amount}`)}>
              <View className='btn separator'>
                <View className='btn__slot'>
                  <Image mode='widthFix' src={QianbaoIcon} />
                  <View className='text'>钱包</View>
                </View>
              </View>
              <View className='btn separator'>
                <View className='btn__slot'>
                  <View className='text t'>余额</View>
                  <View className='price number'>{ (Number(this.state.user.balance.amount) + Number(this.state.user.balance.locked_amount)).toFixed(2) }</View>
                </View>
              </View>
            </View>
          </View>
          <View className='content'>
            {
              menus.map((item: any) => {
                return <MenuListItem path={item.path} label={item.label} icon={item.icon} />
              })
            }
            <MenuListItem label='联系客服' icon={Icon4} onClick={this.contact} />
            <Image mode='widthFix' src={bgImg} className='bg-img' />
          </View>
          <TabBar active="mine" />
        </View>
      </View>
    )
  }
}
