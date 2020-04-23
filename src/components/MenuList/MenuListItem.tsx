import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import './menu-list-item.scss'
import Arrow from '../../assets/images/common/arrow.png'


export default function MenuListItem(props: any) {
  function navigateTo(url: string) {
    Taro.navigateTo({
      url
    })
  }

  return <View className='menu-list-item' onClick={navigateTo.bind(props.path)}>
    <View className='left'>
      <Image mode='widthFix' src={props.icon} />
      <Text>{ props.label }</Text>
    </View>
    <View className='right'>
      <Image mode='widthFix' src={Arrow} />
    </View>
  </View>
}

MenuListItem.propTypes = {
  label: propTypes.string,
  icon: propTypes.any,
  path: propTypes.string
}