import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import propTypes from 'prop-types'
import './input-number.scss'

export default function InputNumber(props: any) {
  console.log('input number props: ', props)
  const [value, setValue] = useState(props.value)
  const [min] = useState(props.min)
  const [max] = useState(props.max)

  function minus() {
    const result = Number(value) - 1
    if (min !== null && result < min) return
    setValue(result)
  }

  function add() {
    const result = Number(value) + 1
    if (max !== null && result > max) return
    setValue(result)
  }

  function change(val: number): any {
    if (min !== null && val < min) {
      setValue(min)
      return min
    } else if (max !== null && val > max) {
      setValue(max)
      return max
    } else if (val !== value){
      setValue(val)
      return val
    }
  }

  useEffect(() => {
    props.onChangeNumber(value)
  }, [value])

  return <View className='input-number-wrap'>
    <View className={`btn-wrap number ${props.min !== null && value <= props.min ? 'disabled' : ''}`} onClick={minus}>
      <Text className='btn'>-</Text>
    </View>
    <Input className='number' value={value} onInput={change(value)} type='number' />
    <View className={`btn-wrap number ${props.max !== null && value >= props.max ? 'disabled' : ''}`} onClick={add}>
      <Text className='btn'>+</Text>
    </View>
  </View>
}

InputNumber.propTypes = {
  value: propTypes.number,
  max: propTypes.number,
  min: propTypes.number,
  onChangeNumber: propTypes.func
}

InputNumber.defaultProps = {
  value: 0,
  max: null,
  min: null,
  onChangeNumber: () => {}
}