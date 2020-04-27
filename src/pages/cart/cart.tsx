import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Checkbox } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './cart.scss'
import InputNumber from '../../components/InputNumber/InputNumber'
import Button from '../../components/Button/button'
import { carts } from '../../api/mall/mall'

export default class Cart extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      allChecked: true,
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

  getList() {
    carts().then((res: any) => {
      res.data = res.data.map((item: any) => {
        item.checked = true
        return item
      })
      this.handleDefaultList(res).then(() => {
        this.calcTotal()
      })
    })
  }

  // 切换选中
  checkChange(row: any) {
    const data = this.state.list.data.map((item: any) => {
      if (item.id === row.id) {
        item.checked = !item.checked
      }
      return item
    })
    const allChecked = data.every((item: any) => {
      return item.checked
    })
    const list = Object.assign({}, this.state.list, {data})
    this.setState({
      list,
      allChecked
    })
  }

  // 切换选择全部
  checkAll(val: boolean) {
    const allChecked = !val
    const data = this.state.list.data.map((item: any) => {
      item.checked = allChecked
      return item
    })
    this.setState({
      list: {
        data
      },
      allChecked
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

  // 计算总价
  calcTotal() {
    const arr = this.state.list.data.filter((item: any) => {
      return item.checked
    })
    if (arr.length > 0) {
      const total = arr.map((item: any) => {
        return item.goods.sell_price * item.num
      }).reduce((total: number, price: number) => {
        return total + price
      })
      this.setState({
        total
      })
    } else {
      this.setState({
        total: 0
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
    const goods = JSON.stringify(arr)
    this.navigateTo('/pages/createOrder/createOrder', { goods })
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
            this.state.list.data.length !== 0 ?
            this.state.list.data.map((item: any) => {
              return <View className='block'>
                <View className='top'>
                  <View className='left'>
                    <Checkbox checked={item.checked} value={item.id} onChange={this.checkChange.bind(this, item)} />
                  </View>
                  <Image src={item.goods.image} mode='widthFix' />
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
            <Checkbox checked={this.state.allChecked} value='all' onChange={this.checkAll.bind(this, this.state.allChecked)} >
              全选
            </Checkbox>
          </View>
          <View className='right'>
            <Text style='margin-right: 20px;' className='bold'>
              合计:
              <Text className='number price'>
                ￥{ this.state.total }
              </Text>
            </Text>
            <Button text='结算' type='primary' onClick={this.settle.bind(this)} round />
          </View>
        </View>
      </View>
    )
  }
}