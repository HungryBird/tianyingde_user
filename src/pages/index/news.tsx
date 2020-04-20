import Taro, { Config } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './news.scss'

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
      navTitle: decodeURI(title),
      id
    })
  }

  config: Config = {
    navigationBarTitleText: '资讯动态',
    window: {
      navigationStyle: 'custom'
    }
  }

  render() {
    const html = '<p>测试富文本</p>'

    return (
      <View className='news'>
        <Nav title={this.state.navTitle} />
        <View className='content'>
          <View className='title'>
            测试标题
          </View>
          <View className='time number'>
            2020-04-16
          </View>
          <RichText className='rich-text' nodes={html} />
        </View>
      </View>
    )
  }
}