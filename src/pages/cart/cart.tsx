import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image, Checkbox } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Mixins from '../../mixins/mixin'
import './cart.scss'
import _list from './data'
import Img from '../../assets/images/mall/shangptu.png'
import InputNumber from '../../components/InputNumber/InputNumber'
import Button from '../../components/Button/button'
import { carts } from '../../api/mall/mall'

export default class Cart extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      allChecked: true,
      total: 0,
      list: {
        data: [],
        total: 0,
        size: 10,
        page: 1,
        type: 'more',
        loading: false
      }
    }
  }

  getList() {
    Taro.showLoading({
      title: '加载中'
    })
    carts().then((res: any) => {
      this.handleDefaultList(res)
    })
  }

  // 切换选中
  checkChange(row: any) {
    const data = this.state.list.data.map((item: any) => {
      if (item.id === row.id) {
        item.checked = !item.checked
      }
      return item
    })
    const allChecked = data.every((item: any) => {
      return item.checked
    })
    const list = Object.assign({}, this.state.list, {data})
    this.setState({
      list,
      allChecked
    })
  }

  checkAll(val: boolean) {
    const allChecked = !val
    const data = this.state.list.data.map((item: any) => {
      item.checked = allChecked
      return item
    })
    this.setState({
      list: {
        data
      },
      allChecked
    })
  }

  // 选择数量
  onChangeNumber(value, targe) {
    //
  }

  componentWillMount() {
    this.getList()
  }

  config: Config = {
    navigationStyle: 'custom'
  }

  render() {
    return(
      <View className='cart'>
        <Nav title='购物车' />
        <View className='content'>
          {
            this.state.list.data.length !== 0 ?
            this.state.list.data.map((item: any) => {
              return <View className='block'>
                <View className='top'>
                  <View className='left'>
                    <Checkbox checked={item.checked} value={item.value} onChange={this.checkChange.bind(this, item)} />
                  </View>
                  <Image src={Img} mode='widthFix' />
                  <View className='right'>
                    <View className='name'>{ item.name }</View>
                    <View className='sub yahei'>{ item.subtitle }</View>
                  </View>
                </View>
                <View className='bottom'>
                  <InputNumber value={ item.value } min={0} onChangeNumber={(value) => this.onChangeNumber(value, item)} />
                  <Text className='number price'>￥{ item.value }</Text>
                </View>
              </View>
            })
            : <View>请您添加商品</View>
          }
        </View>
        <View className='bottom--fixed'>
          <View className='left'>
            <Checkbox checked={this.state.allChecked} value='all' onChange={this.checkAll.bind(this, this.state.allChecked)} >
              全选
            </Checkbox>
          </View>
          <View className='right'>
            <Text style='margin-right: 20px;' className='bold'>
              合计:
              <Text className='number price'>
                ￥{ this.state.total }
              </Text>
            </Text>
            <Button text='结算' type='buy' round />
          </View>
        </View>
      </View>
    )
  }
}