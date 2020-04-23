import Taro, { Config } from '@tarojs/taro'
import Mixin from '../../mixins/mixin'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar/TabBar'
import Menus from './menus/menus'
import HeadImg from '../../assets/images/mall/head.png'
import CartIcon from '../../components/CartIcon/CartIcon'
import './mall.scss'
import { goods, carts } from '../../api/mall/mall'

export default class Index extends Mixin {
  constructor(props: any) {
    super(props)
    this.state = {
      tabs: [
        {
          text: '感恩善缘',
          value: 1,
          active: true
        },
        {
          text: '民俗法规',
          value: 2,
          active: false
        },
        {
          text: '企业资讯',
          value: 3,
          active: false
        },
        {
          text: '墓园资讯',
          value: 4,
          active: false
        }
      ],
      carts: 0,
      list: {
        data: [],
        total: 0,
        size: 10,
        page: 1,
        type: 'more',
        loading: false
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    // 获取列表数据
    this.getList()
    // 获取购物车数据
    this.carts()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 触发翻页
  onScrollToLower() {
    this.getList()
  }
  // 获取数据
  getList() {
    goods({}).then((res: any) => {
      this.handleDefaultList(res)
    })
  }
  // 点击tab
  toggleMenu() {
    this.initList().then(() => {
      this.getList()
    })
  }
  // 看新闻
  seeGood(id: string) {
    this.navigateTo('/pages/good/good', {
      id
    })
  }
  // 获取购物车
  carts() {
    carts().then((res: any) => {
      const carts = res.meta.page_info.total
      this.setState({
        carts
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
    navigationBarTitleText: '商城'
  }

  render () {
    const threshold: number = 20

    return (
      <View className='mall'>
        <View className='head-wrap'>
          <View className='head-bar'>
            <Text className='head-title'>商城</Text>
            <CartIcon number={this.state.carts} />
          </View>
          <Image 
            src={HeadImg} 
            style='width: 100%;'
            mode='widthFix' />
        </View>
        <Menus toggleMenu={this.toggleMenu.bind(this)} />
        <View className='inner'>
          <View 
            className='content'>
            <ScrollView
              scrollY
              lowerThreshold={threshold}
              onScrollToLower={this.onScrollToLower.bind(this)}>
                <View className='list-wrap'>
                  {
                    this.state.list.data.map((item: any) => {
                      return <View className='list' onClick={this.seeGood.bind(this, item.id)}>
                        <View style='width: 100%;'>
                          <Image src={item.image} mode='widthFix' style='width: 100%;' />
                        </View>
                        <View className='name'>{item.goods_name}</View>
                        <View className='number price'>￥{item.sell_price}</View>
                      </View>
                    })
                  }
                </View>
            </ScrollView>
          </View>
        </View>
        <TabBar active='mall' />
      </View>
    )
  }
}
