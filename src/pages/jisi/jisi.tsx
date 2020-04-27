import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text, Input, Form } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import './jisi.scss'
import { isEmpty } from '../../utils/util'
import reg from '../../utils/reg'
import Button from '../../components/Button/Button'
import cloud from '../../assets/images/common/xiangyun.png'
import Mask from '../../components/Mask/Mask'
import { inject, observer } from '@tarojs/mobx'
import { addServiceOrder } from '../../api/service/service'

@inject('infoStore')
@observer
export default class Binyi extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      form: {
        contact: '',
        mobile: ''
      }
    }
  }

  config: Config ={
    navigationStyle: 'custom',
    navigationBarTitleText: '祭祀服务'
  }

  componentWillMount() {
    //
  }

  yuyue() {
    this.setState({
      visible: true
    })
  }

  visibleChange(visible: boolean) {
    this.setState({
      visible
    })
  }

  reset(e: any) {
    console.log('reset: ', e)
  }

  submit = (e: any) => {
    const value = e.detail.value
    for (const key in value) {
      if (isEmpty(value[key])) {
        Taro.showToast({
          icon: 'none',
          title: '请填写必填项'
        })
        return
      }
      if (key === 'mobile') {
        const v = reg.mobile.test(value.mobile)
        if (!v) {
          Taro.showToast({
            icon: 'none',
            title: '请填写正确的手机号码'
          })
          return
        }
      }
    }
    
    const form = {
      category: 3,
      ...value
    }
    addServiceOrder(form).then((res: any) => {
      this.setState({
        visible: false,
        form: {
          contact: '',
          mobile: ''
        }
      })
      Taro.showToast({
        icon: 'none',
        title: res.message,
        duration: 3000
      })
    })
  }

  render() {
    return (
      <View className='jisi page-main'>
        <Nav title='祭祀服务' />
        <View className='inner'>
          <View 
            className='content'>
            <View className='title-outter-wrap'>
              <View className='title-inner-wrap'>
                <View className='title'>服务流程介绍</View>
              </View>
              <Image className='right cloud' src={cloud} mode='widthFix' />
            </View>
            <View className='text-wrap'>
              <ol>
                <li>祭祀需求用户下单服务</li>
                <li>业务员联系用户，并上门对接（时间暂缓，根据用户协商选择日期，地址，面谈）</li>
                <li>确认需要服务，但用户对服务员服务不满意，更换服务员上门（极少出现，可以合并到转单功能）</li>
                <li>择日算命，风水冲煞</li>
                <li>用户当面确定套餐，支付定金（或不支付定金）</li>
                <li>开始服务，正在服务中，看地、选地</li>
                <li>业务员告知用户服务已经完成，需要支付尾款，用户确认服务已经完成，支付尾款，并对业务员评价</li>
                <li>祭祀服务已经完成，用户档案进入CRM系统，逢年过节，业务员免费慰问提醒</li>
              </ol>
            </View>
          </View>
          <Button type='primary' round text='预约服务' style='margin-top: 20px;' onClick={this.yuyue.bind(this)} />
        </View>
        
        <Mask visible={this.state.visible} onChangeVisible={this.visibleChange.bind(this)}>
          <View className='form-wrap'>
            <View className='top'>
              <View className='title-wrap'>填写信息</View>
            </View>
            <View className='bottom-content'>
              <Form onSubmit={this.submit.bind(this)} onReset={this.reset.bind(this)}>
                <View className='form-item border'>
                  <View className='label'>预约人姓名</View>
                  <View className='value'>
                    <Input name='contact' value={this.state.form.contact} placeholder='输入预约人姓名' />
                  </View>
                </View>
                <View className='form-item border'>
                  <View className='label'>预约人手机</View>
                  <View className='value'>
                    <Input name='mobile' value={this.state.form.mobile} type='number' placeholder='输入预约人手机号码' />
                  </View>
                </View>
                <Button formType='submit' text='支付' type='primary' style='margin: 30px auto;margin-bottom: 10px;width: 50%;' round />
              </Form>
            </View>
          </View>
        </Mask>
      </View>
   )
  }
}