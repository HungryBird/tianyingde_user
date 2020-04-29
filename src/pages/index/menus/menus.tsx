
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './menus.scss'
import obituary from '../../../assets/images/home/menus/zaixianfugao_home.png'
import funeral from '../../../assets/images/home/menus/binyifuwu_home.png'
import burial from '../../../assets/images/home/menus/zangyifuwu_home.png'
import fete from '../../../assets/images/home/menus/jisifuwu_home.png'

const menus = [
  {
    icon: obituary,
    text: '在线讣告',
    path: '/pages/online/list'
  },
  {
    icon: funeral,
    text: '殡仪服务',
    path: '/pages/binyi/binyi'
  },
  {
    icon: burial,
    text: '葬仪服务',
    path: '/pages/zangyi/zangyi'
  },
  {
    icon: fete,
    text: '祭祀服务',
    path: '/pages/jisi/jisi'
  }
]

export default function Menus() {
  function goPage(url: string) {
    Taro.navigateTo({
      url
    })
  }

  return <View className='index-menus-wrap'>
    {
      menus.map(item => {
        return <View key={item.path} className='menu' onClick={goPage.bind(this, item.path)}>
          <View className='img-wrap'>
            <Image src={item.icon} mode='widthFix' />
          </View>
          <Text>{ item.text }</Text>
        </View>
      })
    }
  </View>
}