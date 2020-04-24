import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import './address.scss'
import bgImg from '../../assets/images/mine/ditubeij.png'
import { addresses } from '../../api/addresses/addresses'
import { isEmpty } from '../../utils/util'
import TaroRegionPicker from '../../components/taro-region-picker'

export default class Address extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      address: {}
    }
  }

  config: Config ={
    navigationStyle: 'custom',
    navigationBarTitleText: '收货地址'
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
    this.getAddresses()
  }

  onGetRegion(e: any) {
    console.log('e: ', e)
  }

  render() {
    return (
      <View className='address page-main'>
        <Nav title='收货地址' />
        <View className='address-wrap border'>
          <View className='form-item'>
            <Text className='label'>收货人</Text>
            {/* <View className='value'>{ this.state.address.receiver }</View> */}
            <Input value={this.state.address.receiver} />
          </View>
          <View className='form-item'>
            <Text className='label'>手机号码</Text>
            <Input value={this.state.address.mobile} />
          </View>
          <View className='form-item'>
            <Text className='label'>收货地址</Text>
            <TaroRegionPicker onGetRegion={this.onGetRegion.bind(this)}>
              <Input value={this.state.address.full_address} />
            </TaroRegionPicker>
          </View>
          <View className='form-item'>
            <Text className='label'>详细地址</Text>
            <Input value={this.state.address.address} />
          </View>
        </View>
        <Image mode='aspectFill' src={bgImg} className='bg-image' />
      </View>
    )
  }
}