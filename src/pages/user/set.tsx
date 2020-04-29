import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text, Input, Form } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import Button from '../../components/Button/Button'
import { userInfo, userSave } from '../../api/user/user'
import { upload } from '../../api/other/upload'
import { addresses } from '../../api/addresses/addresses'
import './set.scss'
import { isEmpty } from 'src/utils/util'
import Arrow from '../../assets/images/common/arrow.png'

@inject('infoStore')
@observer
export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
    this.state = {
      user: {},
      address: {}
    }
  }

  componentDidShow() {
    this.getUserInfo()
    this.getAddressInfo()
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人设置'
  }

  getAddressInfo() {
    addresses({}).then((res: any) => {
      const address = res.data.filter((item: any) => {
        return item.default === 1
      })[0]
      this.setState({
        address
      })
    })
  }

  getUserInfo() {
    userInfo().then((res: any) => {
      this.setState({
        user: res.data
      })
    })
  }

  chooseImg() {
    const self = this
    Taro.chooseImage({
      success(res: any) {
        const avatar = res.tempFilePaths[0]
        upload(avatar).then((res: any) => {
          const user = Object.assign({}, self.state.user, {avatar: res.data.image_url})
          self.setState({
            user
          })
        }).catch(() => {
          Taro.showToast({
            icon: 'none',
            title: '上传失败'
          })
        })
      }
    })
  }

  save(e: any) {
    const form = e.detail.value
    for (const key in form) {
      if (key) {

      }
    }
  }

  render() {
    return(
      <View className='set page-main'>
        <Nav title='个人设置' />
        <Form className='form-wrap border' onSubmit={this.save.bind(this)}>
          <View className='form-item inline'>
            <Text className='label'>头像</Text>
            <Input name='avatar' value={this.state.user.avatar} style='display: none;' />
            <Image className='touxiang' src={this.state.user.avatar} onClick={this.chooseImg.bind(this)} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>昵称</Text>
            <Input name='nickname' value={this.state.user.nickname} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>手机号码</Text>
            <Input name='mobile' value={this.state.user.mobile} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>收货地址</Text>
            <View className='more' onClick={this.navigateTo.bind(this, '/pages/address/address?action=change')}>
              <View className='address'>{this.state.address.full_address}</View>
              <Image mode='aspectFit' src={Arrow} />
            </View>
          </View>
          <View style='width: 100%;text-align: center;margin-top: 40px;'>
            <Button formType='submit' text='保存' type='primary' round />
          </View>
        </Form>
        <Image mode='widthFix' src={bgImg} className='bg-img' />
      </View>
    )
  }
}