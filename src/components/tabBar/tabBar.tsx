import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './tab-bar.scss'
import PropTypes from 'prop-types'
import shouye_guan from '../../assets/images/tabBar/shouye_guan.png'
import shouye_zhong from '../../assets/images/tabBar/shouye_zhong.png'
import shangcheng_guan from '../../assets/images/tabBar/shangcheng_guan.png'
import shangcheng_zhong from '../../assets/images/tabBar/shangcheng_zhong.png'
import wode_guan from '../../assets/images/tabBar/wode_guan.png'
import wode_zhong from '../../assets/images/tabBar/wode_zhong.png'

const tabs = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: shouye_guan,
    selectedIconPath: shouye_zhong,
    value: 'home'
  },
  {
    pagePath: '/pages/mall/mall',
    text: '商城',
    iconPath: shangcheng_guan,
    selectedIconPath: shangcheng_zhong,
    value: 'mall'
  },
  {
    pagePath: '/pages/mine/mine',
    text: '我的',
    iconPath: wode_guan,
    selectedIconPath: wode_zhong,
    value: 'mine'
  }
]

export default function TabBar(props) {
  function goPage(url: string) {
    Taro.navigateTo({
      url
    })
  }

  return <View className='tabbar-wrap'>
    {
      tabs.map(tab => {
        return <View className='tab' onClick={goPage.bind(this, tab.pagePath)}>
          <Image src={props.active === tab.value ? tab.selectedIconPath : tab.iconPath} mode='aspectFit' />
          <Text className={props.active === tab.value ? 'tab-text tab-active' : 'tab-text'}>{ tab.text }</Text>
        </View>
      })
    }
  </View>
}

TabBar.PropTypes = {
  active: PropTypes.string
}

TabBar.defaultProps = {
  active: 'home'
}