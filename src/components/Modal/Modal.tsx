import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import Mask from '../Mask/Mask'
import Btn from '../Btn/Btn'
import './modal.scss'

export default function Model(props: any) {
  const [visible, setVisible] = useState(props.visible)

  useEffect(() => {
    if (props.visible === visible) return
    changeVisible(props.visible)
  }, [props.visible])

  useEffect(() => {
    if (props.visible === visible) return
    props.onChange(visible)
  }, [visible])

  function ok() {
    changeVisible(false)
    props.onOk()
  }

  function cancel() {
    changeVisible(false)
    props.onCancel()
  }

  function changeVisible(visible: boolean) {
    setVisible(visible)
  }

  return <Mask visible={visible} onChangeVisible={changeVisible}>
    <View className='modal'>
      <View className='top'>
        <Text className='title-wrap'>
          { props.title }
        </Text>
      </View>
      <View className='content'>
        { props.content }
      </View>
      <View className='modal-bot'>
        <Btn text={props.cancelText} round type='primary' onClick={cancel} />
        <Btn text={props.okText} round type='primary' onClick={ok} />
      </View>
    </View>
  </Mask>
}

Model.propTypes = {
  visible: propTypes.bool,
  content: propTypes.string,
  title: propTypes.string,
  okText: propTypes.string,
  cancelText: propTypes.string,
  onOk: propTypes.func,
  onCancel: propTypes.func,
  onChange: propTypes.func,
  ref: propTypes.string
}

Model.defaultProps = {
  visible: false,
  content: '',
  title: '提示',
  okText: '确认',
  cancelText: '取消',
  onOk: () => {},
  onCancel: () => {},
  onChange: () => {}
}