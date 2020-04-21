import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import NavBar from '../../components/Nav/Nav'
import { good } from '../../api/mall/mall'
import './good.scss'

export default class Good extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    
  }

  render() {
    return(
      <View>
        <NavBar title='商品详情' />
      </View>
    )
  }
}