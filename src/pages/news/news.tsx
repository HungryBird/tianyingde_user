import Taro, { Config } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './news.scss'
import { article } from '../../api/index/list'

export default class News extends Mixins {
  constructor() {
    super()
    this.state = {
      navTitle: '',
      id: '',
      content: {
        title: '',
        content: '',
        images: '',
        pageviews: '',
        updated_at: ''
      }
    }
  }

  componentWillMount() {
    const { id, title } = this.$router.params
    this.setState({
      navTitle: decodeURI(title),
      id
    })
    this.article(id)
  }

  article(id: string) {
    article(id).then((res: any) => {
      const content = Object.assign({}, res.data)
      this.setState({
        content
      })
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
            { this.state.content.title }
          </View>
          <View className='time number'>
            { this.state.content.updated_at }
          </View>
          <RichText className='rich-text' nodes={this.state.content.content} />
        </View>
      </View>
    )
  }
}