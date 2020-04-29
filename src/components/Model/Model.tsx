import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import propTypes from 'prop-types'
import Mask from '../Mask/Mask'
import './model.scss'

export default function Model(props: any) {
  

  return <Mask>
    <View>
      
    </View>
  </Mask>
}

Model.propTypes = {
  content: propTypes.string,
  title: propTypes.string,
  okText: propTypes.string,
  cancelText: propTypes.string
}

Model.defaultProps = {
  content: '',
  title: '提示',
  confirmButtonText: '确认',
  cancelText: '取消'
}