import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Checkbox } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './createOrder.scss'
import Img from '../../assets/images/mall/shangptu.png'
import InputNumber from '../../components/InputNumber/InputNumber'
import { addresses } from '../../api/addresses/addresses'
import { addOrder, wechatpay } from '../../api/mall/mall'
import Button from '../../components/Button/button'
import { isEmpty } from '../../utils/util'
import { inject, observer } from '@tarojs/mobx'

@inject('infoStore')
@observer
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
      },
      address: {},
      buy: {
        form: {
          address: '',
          receiver: '',
          mobile: ''
        }
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
    if (isEmpty(this.state.address)) {
      Taro.showToast({
        title: '请添加地址',
        duration: 2000
      })
      return
    }
    const goods_id = arr.map((item: any) => {
      return item.goods.id
    })
    const quantity = arr.map((item: any) => {
      return item.num
    })
    const data = {
      goods_id,
      quantity,
      address_id: this.state.address.id
    }
    addOrder(data).then((res: any) => {
      wechatpay({
        out_trade_no: res.data.out_trade_no
      }).then((res: any) => {
        Taro.requestPayment({
          ...res.data,
          success() {
            this.navigateTo({
              url: '/pages/mine/'
            })
          },
          fail(err: any) {
            
          }
        })
      })
    })
  }

  // 获取地址
  getAddresses() {
    addresses({}).then((res: any) => {
      const address = res.data.filter((item: any) => {
        return item.default === 1
      })[0]
      if (!isEmpty(address)) {
        this.setState({
          address
        })
      }
      
    })
  }

  componentWillMount() {
    const { goods } = this.$router.params
    const str = decodeURI(goods)
    const data = JSON.parse(str).map((item: any) => {
      item.checked = true
      return item
    })
    const list = Object.assign({}, {...this.state.list, ...{data}})
    this.setState({
      list
    })
    this.getAddresses()
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '确认订单'
  }

  render() {
    return(
      <View className='cart'>
        <Nav title='确认订单' />
        <View className='address-wrap'>
          {
            isEmpty(this.state.address) ?  <View onClick={ this.navigateTo.bind(this, '/pages/address/address') }>点击新增地址</View> : <View className='form' onClick={ this.navigateTo.bind(this, '/pages/address/address')}>
              <View className='form-item'>
                <Text className='label'>收货人</Text>
                <Text className='value'>{ this.state.address.receiver }</Text>
              </View>
              <View className='form-item'>
                <Text className='label'>手机号码</Text>
                <Text className='value'>{ this.state.address.mobile }</Text>
              </View>
              <View className='form-item'>
                <Text className='label'>收货地址</Text>
                <Text className='value'>{ this.state.address.full_address  }</Text>
              </View>
            </View>
          }
        </View>
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
            <Button text='提交订单' type='primary' onClick={this.settle.bind(this)} round />
          </View>
        </View>
      </View>
    )
  }
}