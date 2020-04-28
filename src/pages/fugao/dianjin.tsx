import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import Menu from '../../components/Menu/Menu'
import { golds } from '../../api/fugao/list'
import Arrow from '../../assets/images/common/arrow.png'
import './fugao.scss'

export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      status: 1,
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
    navigationBarTitleText: '奠金'
  }

  getOrders() {
    if (this.state.list.type !== 'more') return
    golds({
      type: this.state.status,
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
        id: 1,
        text: '收钱',
        active: true
      },
      {
        id: 2,
        text: '赠与',
        active: false
      }
    ]
    return(
      <View className='dianjin page-main'>
        <Nav title='奠金' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu} style='margin: 10px auto;' data={data} />
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
                  <View className='right'>
                    <Image src={Arrow} mode='aspectFit' />
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