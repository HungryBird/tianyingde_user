import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import NavBar from '../../components/Nav/Nav'
import { good, addToCart, addOrder, carts } from '../../api/mall/mall'
import { addresses } from '../../api/addresses/addresses'
import CartIcon from '../../components/CartIcon/CartIcon'
import Button from '../../components/Button/Button'
import Mask from '../../components/Mask/Mask'
import InputNumber from '../../components/InputNumber/InputNumber'
import './good.scss'

export default class Good extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      content: {
        image: '',
        goods_name: '',
        goods_sn: '',
        sell_price: 0,
        detail: ''
      },
      address: {},
      buy: {
        visible: false,
        form: {
          goods_id: '',
          number: 1,
          address_id: ''
        }
      },
      cart: {
        total: 0
      }
    }
  }

  config: Config = {
    navigationBarTitleText: '商品详情'
  }

  componentDidMount() {
    const { id } = this.$router.params
    const buy = Object.assign({}, this.state.buy, {
      form: {
        ...this.state.buy.form,
        goods_id: id
      }
    })
    this.setState({
      buy
    }, function() {
      console.log('af buy: ', this.state.buy)
    })
    this.getGoodInfo(id)
    this.getAddresses()
    this.getCarts()
  }

  // 获取购物车数据
  getCarts() {
    carts().then((res: any) => {
      const { total } = res.meta.page_info
      const cart = Object.assign({}, {total})
      this.setState({
        cart
      })
    })
  }

  // 获取地址
  getAddresses() {
    addresses({}).then((res: any) => {
      console.log('address: ', res)
      const address = res.data.filter((item: any) => {
        return item.default === 1
      })[0]
      const { id } = address
      const buy = Object.assign({}, {
        ...this.state.buy,
        form: {
          ...this.state.buy.form,
          address_id: id
        }
      })
      this.setState({
        address,
        buy
      })
    })
  }

  // 获取商品详情
  getGoodInfo(id: string) {
    good(id).then((res: any) => {
      const content = Object.assign({}, res.data)
      this.setState({
        content
      }, function() {
        console.log('content: ', this.state.content)
      })
    })
  }

  // mask visible数据绑定
  changeVisible(visible: boolean) {
    const buy = Object.assign({}, {
      visible,
      form: {
        ...this.state.buy.form
      }
    })
    this.setState({
      buy
    })
  }

  // 打开模态框
  toBuy() {
    const buy = Object.assign({}, {
      visible: true,
      form: {
        ...this.state.buy.form
      }
    })
    this.setState({
      buy
    })
  }

  clickMask(e: any) {
    e.stopPropagation()
  }

  // 修改购买数量
  changeNumber(num: number) {
    console.log('num: ', num)
  }

  // 确认购买
  confirm() {
    addOrder(this.state.buy.form).then((res: any) => {
      
    })
  }

  // 加入到购物车
  addCart() {
    addToCart(this.state.buy.form).then((res: any) => {
      console.log('res: ', res)
    })
  }

  render() {
    return(
      <View className='good-wrap'>
        <View className='main'>
          <NavBar title='商品详情' />
          <CartIcon number={this.state.cart.total} />
          <View className='content'>
            <View className='good'>
              <View>
                <Image style='width: 100%;' mode='aspectFill' src={this.state.content.image} />
              </View>
              <View className='g-bottom'>
                <View className='name'>
                  { this.state.content.goods_name }
                </View>
                <View className='number price'>
                  ￥{ this.state.content.sell_price }
                </View>
              </View>
            </View>
            <RichText nodes={this.state.content.detail}></RichText>
          </View>
          <View className='bottom'>
            <Button text='加入购物车' onClick={this.addCart.bind(this)}  round />
            <Button text='购买' type='buy' onClick={this.toBuy.bind(this)} round />
          </View>
          {/* 遮罩层 */}
          <Mask visible={this.state.buy.visible} onChangeVisible={this.changeVisible.bind(this)}>
            <View className='form-wrap' onClick={this.clickMask.bind(this)}>
              <View className='top'>
                <View className='left'>
                  <Image style='width: 100%;' mode='widthFix' src={this.state.content.image} />
                </View>
                <View className='right'>
                  <View className='name'>
                    { this.state.content.goods_name }
                  </View>
                  <View className='price number'>
                    ￥{ this.state.content.sell_price }
                  </View>
                </View>
              </View>
              <View className='bottom-content'>
                <View className='row'>
                  <Text className='label'>
                    收货人
                  </Text>
                  <Text className='value'>
                    { this.state.address.receiver }
                  </Text>
                </View>
                <View className='row'>
                  <Text className='label'>
                    手机号码
                  </Text>
                  <Text className='value'>
                  { this.state.address.mobile }
                  </Text>
                </View>
                <View className='row'>
                  <Text className='label'>
                    配送地址
                  </Text>
                  <Text className='value'>
                    { this.state.address.full_address }
                  </Text>
                </View>
                <View className='buy-input-wrap'>
                  <View className='label'>
                    购买数量
                  </View>
                  <InputNumber min={1} value={this.state.buy.form.number} onChangeNumber={this.changeNumber.bind(this)} />
                </View>
                <Button text='确定' type='buy' round onClick={this.confirm.bind(this)} />
              </View>
            </View>
          </Mask>
        </View>
      </View>
    )
  }
}