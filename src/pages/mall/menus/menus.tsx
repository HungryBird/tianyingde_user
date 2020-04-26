
import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './menus.scss'
import guhuit_zhong from '../../../assets/images/mall/menus/guhuit_zhong.png'
import guhuit_guan from '../../../assets/images/mall/menus/guhuit_guan.png'
import huaquan_guan from '../../../assets/images/mall/menus/huaquan_guan.png'
import huaquan_zhong from '../../../assets/images/mall/menus/huaquan_zhong.png'
import jipin_guan from '../../../assets/images/mall/menus/jipin_guan.png'
import jipin_zhong from '../../../assets/images/mall/menus/jipin_zhong.png'
import xianghuo_zhong from '../../../assets/images/mall/menus/xianghuo_zhong.png'
import xianghuo_guan from '../../../assets/images/mall/menus/xianghuo_guan.png'
import zhiqian_guan from '../../../assets/images/mall/menus/zhiqian_guan.png'
import zhiqian_zhong from '../../../assets/images/mall/menus/zhiqian_zhong.png'

export default function Menus(props: any) {
  const [menus, setMenus] = useState([
    {
      id: 1,
      icon: guhuit_guan,
      selectedIcon: guhuit_zhong,
      text: '骨灰坛',
      active: true
    },
    {
      id: 2,
      icon: huaquan_guan,
      selectedIcon: huaquan_zhong,
      text: '香火',
      active: false
    },
    {
      id: 3,
      icon: jipin_guan,
      selectedIcon: jipin_zhong,
      text: '纸钱',
      active: false
    },
    {
      id: 4,
      icon: xianghuo_guan,
      selectedIcon: xianghuo_zhong,
      text: '花圈',
      active: false
    },
    {
      id: 5,
      icon: zhiqian_guan,
      selectedIcon: zhiqian_zhong,
      text: '祭品',
      active: false
    }
  ])

  function changeMenu(item: any) {
    setMenus(menus.map(menu => {
      menu.active = item.text === menu.text
      return menu
    }))
    
  }

  useEffect(() => {
    const id = menus.filter((item: any) => {
      return item.active
    })[0]['id']
    props.toggleMenu(id)
  }, [menus])

  return <View className='menus-wrap'>
    {
      menus.map(item => {
        return <View key={item.icon} className={`menu ${item.active ? 'active' : ''}`} onClick={changeMenu.bind(this, item)}>
          <View className='img-wrap'>
            <Image src={item.active ? item.selectedIcon : item.icon} mode='widthFix' />
          </View>
          <Text>{ item.text }</Text>
        </View>
      })
    }
  </View>
}