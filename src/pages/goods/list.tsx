import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import Menu from '../../components/Menu/Menu'
import { orders } from '../../api/mall/mall'
import './list.scss'

export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      status: 0,
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

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '商品订单'
  }

  getOrders() {
    if (this.state.list.type !== 'more') return
    orders({
      status: this.state.status,
      page: this.state.list.page,
      size: this.state.list.size
    }).then((res: any) => {
      this.handleDefaultList(res)
    })
  }

  changeMenu = (item: any) => {
    this.initList().then(() => {
      this.setState({
        status: item.id
      }, function() {
        this.getOrders()
      })
    })
  }

  scrollToLower = () => {
    if (this.state.list.data.length === 0) {
      return
    }
    this.getOrders()
  }

  render() {
    const data = [
      {
        id: 0,
        text: '全部',
        active: true
      },
      {
        id: 1,
        text: '待付款',
        active: false
      },
      {
        id: 2,
        text: '待发货',
        active: false
      },
      {
        id: 3,
        text: '待收货',
        active: false
      },
      {
        id: 4,
        text: '待评价',
        active: false
      }
    ]
    return(
      <View className='good-list page-main'>
        <Nav title='商品订单' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu} style='margin: 10px auto;' data={data} />
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block'>
                  <View className='left'>
                    <Image src={item.image} mode='widthFix' />
                  </View>
                  <View className='right'>
                    <View className='top'>
                      <View className='name'>{ item.name }</View>
                      <View className='number'>商品单号：{ item.order_sn }</View>
                    </View>
                    <View className='bottom'>
                      <View className='price number'>{ item.paid_price }</View>
                      <View className='status'>状态：{ item.status }</View>
                      <View className='time'>下单时间：{ item.created_at }</View>
                    </View>
                  </View>
                </View>
              })
            }
          </ScrollView>
        </View>
        <Image mode='widthFix' src={bgImg} className='bg-img' />
      </View>
    )
  }
}