import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import './menu-list-item.scss'
import Arrow from '../../assets/images/common/arrow.png'


export default function MenuListItem(props: any) {
  function navigateTo() {
    Taro.navigateTo({
      url: props.path
    })
  }

  function click() {
    props.onClick()
  }

  return <View className={`menu-list-item ${props.className}`} style={props.style} onClick={props.onClick ? click.bind(this) : navigateTo.bind(this)}>
    <View className='left'>
      {
        props.icon ? <Image mode='widthFix' src={props.icon} /> : null
      }
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
  path: propTypes.string,
  style: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func
}