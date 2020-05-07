import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import { isEmpty } from '../../utils/util'
import Home from '../../assets/images/fugao/huishouye.png'
import BG1 from '../../assets/images/fugao/muban1_da.png'
import BG2 from '../../assets/images/fugao/muban2_da.png'
import './index.scss'

export default class FugaoService extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      template_platform_id: '1',
      form: {}
    }
  }

  componentDidMount() {
    const { template_platform_id } = this.$router.params
    if (!isEmpty(template_platform_id)) {
      this.setState({
        template_platform_id
      }, function() {
        console.log('state: ', this.state)
      })
    }
    this.setState({
      form: this.$router.params
    })
  }

  render() {
    return (
      <View className='page-main'>
        <View className='fugao-service'>
          <View className='top'>
            <Image src={Home} mode='widthFix' className='home-btn' onClick={this.goback.bind(this)} />
          </View>
          <View className='content'>
            <View className={`inner bg${this.state.template_platform_id}`}>测试一下</View>
          </View>
          <View className='bot'>
            这是底部
          </View>
        </View>
        <Image src={this.state.template_platform_id === '1' ? BG1 : BG2} className='bg' />
      </View>
    )
  }
}