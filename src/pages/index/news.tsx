import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Nav from '../../components/nav/Nav'
import Mixins from '../../mixins/mixin'

export default class News extends Mixins {
  constructor() {
    super()
    this.state = {
      navTitle: '',
      id: '',

    }
  }

  componentWillMount() {
    const { id, title } = this.$router.params
    this.setState({
      navTitle: title,
      id
    }, function() {
      console.log('state: ', this.state)
    })
  }

  config: Config = {
    navigationBarTitleText: '资讯动态',
    window: {
      navigationStyle: 'custom'
    }
  }

  render() {
    return (
      <View className='news'>
        <Nav title={this.state.navTitle} />
        <View className='content'>
          <View className='title'>
            测试标题
          </View>
          <View className='time'>
            2020-04-16
          </View>
        </View>
      </View>
    )
  }
}