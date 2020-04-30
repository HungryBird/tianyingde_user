import Taro, {Config} from '@tarojs/taro'
import Mixins from '../../mixins/mixin'
import { View, Form, Image, Input, Text, Picker, RadioGroup, Radio } from '@tarojs/components'
import Nav from '../../components/Nav/Nav'
import Btn from '../../components/Btn/Btn'
import './add.scss'

export default class FugaoAdd extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '讣告新增'
    }
  }

  componentWillMount() {
    const { action } = this.$router.params
    const title = action === 'add' ? '讣告新增' : '讣告编辑'
    this.setState({
      title
    })
    Taro.setNavigationBarTitle({
      title
    })
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '讣告编辑'
  }

  submit() {
    //
  }

  render() {
    return <View className='page-main add'>
      <Nav title={this.state.title} />
      <Form onSubmit={this.submit.bind(this)} className='form-wrap border'>
        <View className='content'>
          <View className='form-item inline'>
            <Text className='label'>
              称谓
            </Text>
            <Input placeholder='请输入称谓' />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              逝者姓名
            </Text>
            <Input placeholder='请输入逝者姓名' />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              性别
            </Text>
            <RadioGroup>
              <Radio value='1'>男</Radio>
              <Radio value='0'>女</Radio>
            </RadioGroup>
          </View>
        </View>
        <View className='bot'>
          <Btn text='保存草稿' formType='submit' round />
          <Btn text='发布' type='primary' formType='submit' round />
        </View>
      </Form>
    </View>
  }
}