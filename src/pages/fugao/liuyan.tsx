import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import Menu from '../../components/Menu/Menu'
import { notes } from '../../api/fugao/list'
import './fugao.scss'

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
    navigationBarTitleText: '留言'
  }

  getOrders() {
    if (this.state.list.type !== 'more') return
    notes({
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
        text: '发出',
        active: true
      },
      {
        id: 2,
        text: '收到',
        active: false
      }
    ]
    return(
      <View className='liuyan page-main'>
        <Nav title='留言' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu} style='margin: 10px auto;' data={data} />
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block'>
                  <Image src={item.user.avatar} className='left' mode='widthFix' />
                  <View className='right'>
                    <View className='label'>讣告编号：{ item.obituary.auto_number }</View>
                    <View className='name'>{ item.user.nickname }</View>
                    <View className='content'>
                      { item.content }
                    </View>
                    <View className='label time'>
                      时间：{ item.created_at }
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