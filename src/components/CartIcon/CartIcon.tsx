import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import './cart-icon.scss'
import CartIcon from '../../assets/images/mall/gouwuche.png'

export default function Cart(props: any) {
  function navigateTo() {
    Taro.navigateTo({
      url: props.url
    })
  }

  return <View className='cart-icon' onClick={navigateTo.bind('/pages/cart/cart')}>
    <Text className='dot number'>
      { props.number }
    </Text>
    <Image src={CartIcon} mode='widthFix' style='width: 100%;' />
  </View>
}

Cart.propTypes = {
  number: propTypes.number,
  url: propTypes.string
}

Cart.defaultProps = {
  number: 0,
  url: '/pages/cart/cart'
}


