import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import './binyi.scss'
import { addresses, addAddress, updateAddress } from '../../api/addresses/addresses'
import { isEmpty } from '../../utils/util'
import Button from '../../components/Button/Button'

export default class Binyi extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      address: {}
    }
  }

  config: Config ={
    navigationStyle: 'custom',
    navigationBarTitleText: '殡仪服务'
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

  save() {
    const submit = isEmpty(this.state.address) ? addAddress : updateAddress
    submit(this.state.address)
  }

  render() {
    return (
      <View className='address page-main'>
        <Nav title='殡仪服务' />
        
      </View>
    )
  }
}