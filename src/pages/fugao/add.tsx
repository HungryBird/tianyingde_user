import Taro, {Config} from '@tarojs/taro'
import Mixins from '../../mixins/mixin'
import { View, Form, Image, Input, Text, Picker, RadioGroup, Radio, Textarea } from '@tarojs/components'
import { isEmpty } from '../../utils/util'
import { upload } from '../../api/other/upload'
import Nav from '../../components/Nav/Nav'
import Btn from '../../components/Btn/Btn'
import M1 from '../../assets/images/fugao/muban1.png'
import M2 from '../../assets/images/fugao/muban2.png'
import Upload from '../../assets/images/common/upload.png'
import './add.scss'

const sexs = [
  {
    text: '男',
    value: '1'
  },
  {
    text: '女',
    value: '2'
  }
]

const mobans = [
  {
    src: M1,
    value: '1'
  },
  {
    src: M2,
    value: '2'
  }
]
export default class FugaoAdd extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '讣告新增',
      form: {
        salutation: '',
        deceased_name: '',
        gender: '1',
        birth_date: '',
        death_date: '',
        template_platform_id: '1',
        deceased_picture: ''
      }
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

  changeSex(...args: any[]) {
    const index = args[1]
    const gender = sexs.filter((item: any, i: number) => {
      return index === i
    })[0].value
    const form = Object.assign({}, this.state.form, { gender })
    this.setState({
      form
    })
  }

  changBirth(e: any) {
    const birth_date = e.detail.value
    const form = Object.assign({}, this.state.form, { birth_date })
    this.setState({
      form
    })
  }

  changeMoban(template_platform_id: string) {
    const form = Object.assign({}, this.state.form, { template_platform_id })
    this.setState({
      form
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

  render() {
    return <View className='page-main add'>
      <Nav title={this.state.title} />
      <Form onSubmit={this.submit.bind(this)} className='form-wrap border'>
        <View className='content'>
          <View className='form-item inline'>
            <Text className='label'>
              称谓
            </Text>
            <Input placeholder='请输入称谓' value={this.state.form.salutation} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              逝者姓名
            </Text>
            <Input placeholder='请输入逝者姓名' value={this.state.form.deceased_name} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              性别
            </Text>
            <RadioGroup style='display: flex;' onChange={this.changeSex.bind(this)}>
              {
                sexs.map((item: any) => {
                  return <Radio checked={item.value === this.state.form.gender} key={item.value} value={item.value}>{item.text}</Radio>
                })
              }
            </RadioGroup>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              出生日期
            </Text>
            <Picker mode='date' onChange={this.changBirth.bind(this)} value={this.state.form.birth_date}>
              <Input placeholder='请选择日期' value={this.state.form.birth_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              逝世日期
            </Text>
            <Picker mode='date' onChange={this.changBirth.bind(this)} value={this.state.form.death_date}>
              <Input placeholder='请选择日期' value={this.state.form.death_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              寿数说明
            </Text>
            <Input placeholder='请输入寿数说明' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              灵堂位置
            </Text>
            <Input placeholder='请输入灵堂位置' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              追悼会时间
            </Text>
            <Picker mode='date' onChange={this.changBirth.bind(this)} value={this.state.form.death_date}>
              <Input placeholder='请选择日期' value={this.state.form.death_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              主事人称谓
            </Text>
            <Input placeholder='请输入主事人称谓' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              主事人姓名
            </Text>
            <Input placeholder='请输入主事人姓名' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              主事人电话
            </Text>
            <Input placeholder='请输入主事人电话' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              治丧管家姓名
            </Text>
            <Input placeholder='请输入治丧管家姓名' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              治丧管家电话
            </Text>
            <Input placeholder='请输入治丧管家电话' value={this.state.form.life_number_descr} />
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              讣告备注
            </Text>
            <Textarea placeholder='请输入讣告备注' value={this.state.form.life_number_descr} maxlength={200} />
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              讣告模板
            </Text>
            <Text className='label remark'>(请选择讣告模板)</Text>
            <RadioGroup className='template-wrap'>
              {
                mobans.map((item: any) => {
                  return <View className='moban' onClick={this.changeMoban.bind(this, item.value)}>
                    <Image src={item.src} mode='aspectFit' />
                    <Radio value={item.value} key={item.value} checked={this.state.form.template_platform_id === item.value} />
                  </View>
                })
              }
            </RadioGroup>
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              请选择逝者图片
            </Text>
            <Image onClick={this.chooseImg.bind(this)} src={isEmpty(this.state.form.deceased_picture) ? Upload : this.state.form.deceased_picture} mode='widthFix' className='upload' />
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