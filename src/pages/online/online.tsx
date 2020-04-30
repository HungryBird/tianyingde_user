import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import './online.scss'

export default class Online extends Mixins {
  constructor(props: any) {
    super(props)
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '在线讣告'
  }

  render() {
    return(
      <View className='page-main online'>
        
      </View>
    )
  }
}