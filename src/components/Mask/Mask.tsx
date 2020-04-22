import Taro, { useEffect, useState, Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import propTypes from 'prop-types'
import './mask.scss'

// export default function Mask (props: any) {
//   const [visible, setVisible] = useState(props.visible)

//   useEffect(() => {
//     console.log('props1: ', props)
//     console.log('visible1: ', visible)
//     return () => {
//       console.log('props2: ', props)
//       console.log('visible2: ', visible)
//     }
//   })

//   function toggleVisible() {
//     setVisible(!visible)
//     props.onChangeVisible(!visible)
//   }

//   return <View>
//     {
//       visible ? <View className='mask-wrap' onClick={toggleVisible}>
//         {
//           Array.isArray(props.children) ? 
//           props.children.map((item: any) => {
//             return item
//           }) : props.children
//         }
//       </View> : null
//     }
//   </View>
  
// }

// Mask.propTypes = {
//   visible: propTypes.bool,
//   onChangeVisible: propTypes.func
// }

// Mask.defaultProps = {
//   visible: false
// }

export default class Mask extends Component<any, any> {
  static propTypes: { 
    visible: propTypes.Requireable<boolean>; 
    onChangeVisible: propTypes.Requireable<(...args: any[]) => any> 
  }
  static defaultProps: { 
    visible: false 
  }
  constructor(props: any) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.visible !== this.state.visible) {
      this.toggleVisible()
    }
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible
    })
    this.props.onChangeVisible(!this.state.visible)
  }

  render() {
    return (
      <View>
        {
          this.state.visible ? <View className='mask-wrap' onClick={this.toggleVisible.bind(this)}>
            {
              Array.isArray(this.props.children) ? 
              this.props.children.map((item: any) => {
                return item
              }) : this.props.children
            }
            </View> : null
        }
      </View>
    )
  }
}