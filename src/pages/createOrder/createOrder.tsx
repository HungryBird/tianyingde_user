import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Checkbox } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './createOrder.scss'
import Img from '../../assets/images/mall/shangptu.png'
import InputNumber from '../../components/InputNumber/InputNumber'
import Button from '../../components/Button/button'
import { carts } from '../../api/mall/mall'
import { isEmpty } from '../../utils/util'

export default class Cart extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      totalNumber: 0,
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

  // 切换选中
  checkChange(row: any) {
    const data = this.state.list.data.map((item: any) => {
      if (item.id === row.id) {
        item.checked = !item.checked
      }
      return item
    })

    const list = Object.assign({}, this.state.list, {data})
    this.setState({
      list
    }, function() {
      this.calcTotal()
    })
  }

  // 修改数量
  onChangeNumber(num: number, target: any) {
    const data = this.state.list.data.map((item: any) => {
      item.num = item.id === target.id ? num : item.num
      return item
    })
    const list = Object.assign({}, this.state.list, { data })
    this.setState({
      list
    }, () => {
      this.calcTotal()
    })
  }

  // 计算总价和总件
  calcTotal() {
    const arr = this.state.list.data.filter((item: any) => {
      return item.checked
    })
    if (arr.length > 0) {
      let totalNumber = 0
      const total = arr.map((item: any) => {
        totalNumber += item.num
        return item.goods.sell_price * item.num
      }).reduce((total: number, price: number) => {
        return total + price
      })
      this.setState({
        total,
        totalNumber
      })
    } else {
      this.setState({
        total: 0,
        totalNumber: 0
      })
    }
  }

  // 结算
  settle() {
    const arr = this.state.list.data.filter((item: any) => {
      return item.checked
    })
    if (arr.length === 0) {
      Taro.showToast({
        title: '请选择一件商品',
        duration: 2000
      })
      return
    }
    this.navigateTo('/pages/createOrder/createOrder', arr)
  }

  componentWillMount() {
    const { id, ids } = this.$router.params
    if (!isEmpty(id)) {
      const str = decodeURI(id)
      const good = JSON.parse(str)
      this.setState
    } else if (!isEmpty(ids)) {
      const str = decodeURI(ids)
      const goods = JSON.parse(str)
      
      console.log('ids: ', JSON.parse(JSON.parse(decodeURI(ids))))
    }
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '确认订单'
  }

  render() {
    return(
      <View className='cart'>
        <Nav title='确认订单' />
        <View className='content'>
          {
            this.state.list.data.length !== 0 ?
            this.state.list.data.map((item: any) => {
              return <View className='block'>
                <View className='top'>
                  <View className='left'>
                    <Checkbox checked={item.checked} value={item.id} onChange={this.checkChange.bind(this, item)} />
                  </View>
                  <Image src={Img} mode='widthFix' />
                  <View className='right'>
                    <View className='name'>{ item.goods.goods_name }</View>
                    <View className='sub yahei'>{ item.goods.detail }</View>
                  </View>
                </View>
                <View className='bottom'>
                  <InputNumber value={ item.num } min={1} onChangeNumber={(num) => this.onChangeNumber(num, item)} />
                  <Text className='number price'>￥{ item.goods.sell_price }</Text>
                </View>
              </View>
            })
            : <View>请您添加商品</View>
          }
        </View>
        <View className='bottom--fixed'>
          <View className='left'>
            <Text>共{this.state.totalNumber}件</Text>
          </View>
          <View className='right'>
            <Text style='margin-right: 20px;' className='bold'>
              合计:
              <Text className='number price'>
                ￥{ this.state.total }
              </Text>
            </Text>
            <Button text='提交订单' type='buy' onClick={this.settle.bind(this)} round />
          </View>
        </View>
      </View>
    )
  }
}