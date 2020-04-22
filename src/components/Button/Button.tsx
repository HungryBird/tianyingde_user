import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import propTypes from 'prop-types'
import './button.scss'

export default function Button(props: any) {
  function click() {
    props.onClick()
  }

  return <View onClick={click} className={`button ${props.type ? 'button--' + props.type : 'button--default'} 
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
  round: false,
  onClick: () => {}
}

Button.propTypes = {
  type: propTypes.string,
  size: propTypes.string,
  text: propTypes.string,
  round: propTypes.bool,
  onClick: propTypes.func
}
