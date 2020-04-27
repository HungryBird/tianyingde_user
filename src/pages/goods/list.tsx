import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import Menu from './menus/index'
import { orders } from '../../api/mall/mall'
import './list.scss'

export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      status: 0
    }
  }

  componentWillMount() {
    orders({
      status: this.state.status
    }).then((res: any) => {

    })
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '商品订单'
  }

  changeMenu = (item: any) => {
    console.log('item: ', item)
  }

  scrollToLower = () => {
    console.log('滚动了喂')
  }

  render() {
    return(
      <View className='good-list page-main'>
        <Nav title='商品订单' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu} style='width: 80%;margin: 10px auto;' />
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>

          </ScrollView>
        </View>
        <Image mode='widthFix' src={bgImg} className='bg-img' />
      </View>
    )
  }
}