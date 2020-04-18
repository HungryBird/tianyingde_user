import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Checkbox } from '@tarojs/components'
import Nav from '../../components/nav/Nav'
import Mixins from '../../mixins/mixin'
import './cart.scss'
import _list from './data'
import Img from '../../assets/images/mall/shangptu.png'

export default class Cart extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
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

  getList() {
    Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      const data = this.state.list.data.concat(_list).map((item: any) => {
        item.checked = true
        return item
      })
      const list = Object.assign({}, this.state.list, {data})
      this.setState({
        list
      })
      Taro.hideLoading()
    }, 500)
  }

  checkChange(e: any) {
    const data = this.state.list.data.map((item: any) => {
      if (item.value === e.target.value) {
        item.checked = !item.checked
      }
      return item
    })
    const list = Object.assign({}, this.state.list, {data})
    this.setState({
      list
    })
  }

  componentWillMount() {
    this.getList()
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '购物车'
  }

  render() {
    return(
      <View className='cart'>
        <Nav title='购物车' />
        <View className='content'>
          {
            this.state.list.data.map((item: any) => {
              return <View className='block'>
                <View className='top'>
                  <View className='left'>
                    <Checkbox checked={item.checked} value={item.value} onChange={this.checkChange.bind(this)} />
                  </View>
                  <Image src={Img} mode='widthFix' />
                  <View className='right'>
                    <View className='name'>{ item.name }</View>
                    <View className='sub yahei'>{ item.subtitle }</View>
                  </View>
                </View>
                <View className='bottom'>
                  
                </View>
              </View>
            })
          }
        </View>
        <View className='bottom'>
          这是底部
        </View>
      </View>
    )
  }
}