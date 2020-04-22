import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import './nav.scss'
import Back from '../../assets/images/common/fanhui.png'

export default function Nav() {
  function goBack() {
    Taro.navigateBack()
  }

  return <View className='nav'>
    <Image src={Back} mode='widthFix' className='nav-icon nav-icon--back' onClick={goBack} />
    <View className='title-wrap'>
      <Text>{ this.props.title }</Text>
    </View>
  </View>
}

Nav.PropTypes = {
  title: PropTypes.string
}

Nav.defaultProps = {
  title: '资讯信息'
}