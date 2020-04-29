import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import { getLogs } from '../../api/wallet/wallet'
import './wallet.scss'

export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      total: 0,
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
    navigationBarTitleText: '钱包'
  }

  componentWillMount() {
    const { amount, locked_amount } = this.$router.params
    this.setState({
      total: Number(amount) + Number(locked_amount)
    })
    this.getLogs()
  }

  getLogs() {
    if (this.state.list.type !== 'more') return
    getLogs({
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
    this.getLogs()
  }

  render() {
    return(
      <View className='wallet page-main'>
        <Nav title='钱包' />
        <View className='yue'>
          <Text className='yue-name'>账户余额</Text>
          <Text className='price number'>{this.state.total}</Text>
        </View>
        <View className='scroll-wrap'>
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block'>
                  <View className='left'>
                    <View className='money'>
                      <Text>金额：</Text><Text className={`number ${this.state.status === 1 ? 'price' : ''}`}>{ 999 }</Text>
                    </View>
                    <View className='label'>讣告编号：{ item.auto_number }</View>
                    <View className='label'>时间：{ item.created_at }</View>
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