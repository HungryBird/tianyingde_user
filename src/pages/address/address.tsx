import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text, Input, Form } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import './address.scss'
import bgImg from '../../assets/images/mine/ditubeij.png'
import { addresses, addAddress, updateAddress } from '../../api/addresses/addresses'
import { isEmpty } from '../../utils/util'
import TaroRegionPicker from '../../components/taro-region-picker'
import Button from '../../components/Button/Button'

export default class Address extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      address: {default: 1},
      action: ''
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
    const { action } = this.$router.params
    if (!isEmpty(action)) {
      this.setState({
        action
      })
    }
    this.getAddresses()
  }

  onGetRegion(e: any) {
    console.log('e: ', e)
  }

  save(e: any) {
    const submit = isEmpty(this.state.address) ? addAddress : updateAddress
    const value = e.detail.value
    const _value = {}
    for(const key in value) {
      if (!isEmpty(key)) {
        _value[key] = value[key]
      }
    }
    const form = Object.assign({}, this.state.address, _value)
    submit(form).then((res: any) => {
      Taro.showToast({
        icon: 'none',
        title: res.message
      }).then(() => {
        if (this.state.action === 'change') {
          setTimeout(() => {
            Taro.navigateBack()
          }, 1500)
        }
      })
    })
  }

  render() {
    return (
      <View className='address page-main'>
        <Nav title='收货地址' />
        <Form onSubmit={this.save.bind(this)} className='form-wrap border'>
          <View className='form-item'>
            <Text className='label'>收货人</Text>
            <Input name='receiver' value={this.state.address.receiver} />
          </View>
          <View className='form-item'>
            <Text className='label'>手机号码</Text>
            <Input name='mobile' value={this.state.address.mobile} />
          </View>
          <View className='form-item'>
            <Text className='label'>收货地址</Text>
            <Input value={this.state.address.full_address} name='full_address' style='display: none;' />
            <TaroRegionPicker onGetRegion={this.onGetRegion.bind(this)} region={this.state.address.full_address} />
          </View>
          <View className='form-item'>
            <Text className='label'>详细地址</Text>
            <Input name='address' value={this.state.address.address} />
          </View>
          <View style='width: 100%;text-align: center;margin-top: 40px;'>
            <Button text='保存' type='primary' round formType='submit' />
          </View>
        </Form>
        <Image mode='aspectFill' src={bgImg} className='bg-image' />
      </View>
    )
  }
}