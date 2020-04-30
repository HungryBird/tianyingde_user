import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import propTypes from 'prop-types'
import './btn.scss'

export default function CButton(props: any) {
  function click(e: any) {
    e.stopPropagation()
    props.onClick()
  }

  return <View className={`button ${props.type ? 'button--' + props.type : 'button--default'} 
    ${props.size ? 'button--' + props.size : 'button--default'}
    ${props.round ? 'is-round' : ''} ${props.className}
  `} style={props.style}>
    { props.text }
    <Button className='hide-button' onClick={click} formType={props.formType} />
  </View>
}

CButton.defaultProps = {
  type: '',
  size: '',
  text: '',
  round: false,
  onClick: () => {}
}

CButton.propTypes = {
  type: propTypes.string,
  size: propTypes.string,
  text: propTypes.string,
  round: propTypes.bool,
  onClick: propTypes.func,
  style: propTypes.string,
  className: propTypes.string,
  formType: propTypes.string
}
