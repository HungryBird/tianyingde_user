import Taro, { Config } from '@tarojs/taro'
import Mixin from '../../mixins/mixin'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar/TabBar'
import Menus from './menus/menus'
import HeadImg from '../../assets/images/home/head.png'
import Logo from '../../assets/images/home/Logo.png'
import Banner from '../../assets/images/home/bannatu.png'
import cloud from '../../assets/images/common/xiangyun.png'
import Yuedul from '../../assets/images/common/yuedul.png'
import './index.scss'
import { articles } from '../../api/index/list'

/**
 * 模拟数据
 */
import list from './data'

export default class Index extends Mixin {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {
          text: '感恩善缘',
          value: 1,
          active: true
        },
        {
          text: '民俗法规',
          value: 2,
          active: false
        },
        {
          text: '企业资讯',
          value: 3,
          active: false
        },
        {
          text: '墓园资讯',
          value: 4,
          active: false
        }
      ],
      list: {
        data: [],
        total: 0,
        size: 10,
        page: 1,
        type: 'more',
        loading: false
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    // 获取列表数据
    this.getList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 触发翻页
  onScrollToLower() {
    this.getList()
  }
  // 获取数据
  getList() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    const category = this.state.tabs.filter((item: any) => {
      return item.active
    })[0].value
    articles({
      category,
      page: this.state.list.page,
      size: this.state.list.size
    }).then((res: any) => {
      console.log('res: ', res)
    })
    setTimeout(() => {
      const _list = this.state.list.data.concat(list)
      const data = Object.assign({}, this.state.list, {loading: true, data: _list})
      this.setState({
        list: data
      })
      Taro.hideLoading()
    }, 500)
  }
  // 点击tab
  changeTab(tab: any) {
    this.initList().then(() => {
      const tabs = this.state.tabs.map((item: any) => {
        item.active = item.value === tab.value
        return item
      })
      this.setState(tabs, tabs)
      this.getList()
    })
  }
  // 看新闻
  seeNews(id: string) {
    const title = this.state.tabs.filter((item: any) => {
      return item.active
    })[0]['text']
    this.navigateTo('/pages/index/news', {
      id,
      title
    })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const threshold: number = 20

    return (
      <View className='index'>
        <View className='head-wrap'>
          <Image
            src={Logo}
            className='logo'
            mode='widthFix' />
          <View className='city-wrap'>
            <Text className='left poster'>城市</Text>
            <View className='right poster'>
              南宁
            </View>
          </View>
          <View className='date-info-wrap'>
            <Text className='small poster'>04月04日 星期六</Text>
            <Text className='small poster'>农历三月十二</Text>
            <Text className='big poster'>清明节</Text>
          </View>
          <Image 
            src={HeadImg} 
            style='width: 100%;z-index: -1;'
            mode='widthFix' />
        </View>
        <Menus />
        <View className='inner'>
          <Image 
            src={Banner} 
            mode='widthFix' 
            style='width: 100%;' />
          <View 
            className='content'>
            <View className='title-outter-wrap'>
              <View className='title-inner-wrap'>
                <View className='title'>咨询动态</View>
              </View>
              <Image className='left cloud' src={cloud} mode='widthFix' />
              <Image className='right cloud' src={cloud} mode='widthFix' />
            </View>
            <View className='tabs-wrap'>
              {
                this.state.tabs.map((tab: any) => {
                  return <View className={`tab ${tab.active ? 'active' : ''}`} key={tab.value} onClick={this.changeTab.bind(this, tab)}>
                    { tab.text }
                  </View>
                })
              }
            </View>
            <ScrollView
              scrollY
              lowerThreshold={threshold}
              onScrollToLower={this.onScrollToLower.bind(this)}>
              {
                this.state.list.data.map((item: any) => {
                  return <View className='list' onClick={this.seeNews.bind(this, 100)}>
                    <View className='left'>
                      <Image src={Logo} mode='widthFix' style='width: 100%;' />
                    </View>
                    <View className='right'>
                      <Text className='title'>{ item.title }</Text>
                      <Text className='content-text'>{ item.content }</Text>
                      <View className='bottom'>
                        <View className='ydl'>
                          <Image src={Yuedul} mode='widthFix' />
                          <Text>{ item.zan }</Text>
                        </View>
                        <Text className='time'>{ item.time }</Text>
                      </View>
                    </View>
                  </View>
                })
              }
            </ScrollView>
          </View>
        </View>
        <TabBar active='home' />
      </View>
    )
  }
}
