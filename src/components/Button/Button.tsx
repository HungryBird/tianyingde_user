import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import './button.scss'

export default function Button(props: any) {
    useEffect(() => {
      console.log('props: ', props)
    })

    return <View className={`button ${props.type ? 'button--' + props.type : 'button--defult'} 
      ${props.size ? 'button--' + props.size : 'button--default'}
      ${props.round ? 'is-round' : ''}
    `}>
      { props.text }
    </View>
}

Button.defaultProps = {
  type: '',
  size: '',
  text: '',
  round: false
}

Button.propTypes = {
  type: propTypes.string,
  size: propTypes.string,
  text: propTypes.string,
  round: propTypes.bool
}
