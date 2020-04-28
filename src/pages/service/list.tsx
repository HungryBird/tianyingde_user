import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
// import Menu from './menus/index'
import Menu from '../../components/Menu/Menu'
import { serviceOrders } from '../../api/service/service'
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
    navigationBarTitleText: '服务订单'
  }

  getOrders() {
    if (this.state.list.type !== 'more') return
    serviceOrders({
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

  // 付款状态过滤
  payStatusFilter(status: string) {
    const dict = {
      pending: '待付款',
      paid_deposit: '已付定金',
      paid_balance: '已付尾款',
      full_money: '已付全款'
    }
    return dict[status]
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
        id: 1,
        text: '已预约',
        active: true
      },
      {
        id: 2,
        text: '未结款',
        active: false
      },
      {
        id: 3,
        text: '已结款',
        active: false
      },
      {
        id: 0,
        text: '已失效',
        active: false
      }
    ]
    return(
      <View className='service-list page-main'>
        <Nav title='服务订单' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu} style='width: 80%;margin: 10px auto;' data={data} />
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block'>
                  <View className='banner'>殡仪服务</View>
                  <View className='content'>
                    <View className='label item'>单号：{ item.order_sn }</View>
                    <View className='label item'>预留姓名：{ item.order_sn }</View>
                    <View className='label item'>预留电话：{ item.order_sn }</View>
                    <View className='price number item'>
                      总价：{ item.paid_price }
                    </View>
                    <View className='bottom item'>
                      <View className='status'>状态：{ this.payStatusFilter(item.pay_status) }</View>
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