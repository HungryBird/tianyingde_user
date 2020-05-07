import Taro, {Config} from '@tarojs/taro'
import Mixins from '../../mixins/mixin'
import { View, Form, Image, Input, Text, Picker, RadioGroup, Radio, Textarea } from '@tarojs/components'
import { isEmpty } from '../../utils/util'
import { upload } from '../../api/other/upload'
import { addObituarie, updateObituarie } from '../../api/fugao/list'
import reg from '../../utils/reg'
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
      type: '',
      form: {
        gender: '1',
        template_platform_id: '1',
        deceased_name: '',
        death_date: '',
        principal_name: '',
        principal_telephone: ''
      },
      memorial_service_date: '',
      memorial_service_time: ''
    }
  }

  componentWillMount() {
    const { action } = this.$router.params
    const title = action === 'add' ? '讣告新增' : '讣告编辑'
    if (action === 'edit') {
      const { memorial_service_time } = this.$router.params
      if (!isEmpty(memorial_service_time)) {
        const arr = memorial_service_time.split(' ')
        const date = arr[0]
        const time = arr[1]
        this.setState({
          memorial_service_date: date,
          memorial_service_time: time
        })
      }
      this.setState({
        form: this.$router.params
      })
    }
    this.setState({
      title,
      action
    }, function() {
      console.log('state: ', this.state)
    })
    Taro.setNavigationBarTitle({
      title
    })
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '讣告编辑'
  }

  submit(is_publish: number) {
    const form = Object.assign({}, this.state.form, { is_publish })
    for (const key in form) {
      if ((key === 'principal_name' || key === 'principal_telephone' || key === 'death_date' || key === 'deceased_name') && isEmpty(form[key])) {
        Taro.showToast({
          icon: 'none',
          title: '请输入必填项'
        })
        return
      }
      if ((key === 'principal_telephone' || key === 'funeral_housekeeper_phone') && !reg.mobile.test(form[key])) {
        Taro.showToast({
          icon: 'none',
          title: '请输入正确格式的电话号码'
        })
        return
      }
    }
    const submit  = this.state.action === 'add' ? addObituarie : updateObituarie
    submit(form).then((res: any) => {
      Taro.showToast({
        title: res.message
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/online/list'
        })
      }, 1500)
    }).catch((res: any) => {
      Taro.showToast({
        title: res.message
      })
    })
  }

  changeSex(...args: any[]) {
    if (isEmpty(args[1])) return
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

  changDeath(e: any) {
    const death_date = e.detail.value
    const form = Object.assign({}, this.state.form, { death_date })
    this.setState({
      form
    })
  }

  changeMt(e: any) {
    const memorial_service_time = e.detail.value
    const form = Object.assign({}, this.state.form, { memorial_service_time })
    this.setState({
      form
    })
  }

  changeZDHDate(e: any) {
    const memorial_service_date = e.detail.value
    if (isEmpty(this.state.memorial_service_time)) {
      const time = '0:0:0'
      const memorial_service_time = `${memorial_service_date} ${time}`
      const form = Object.assign({}, this.state.form, {
        memorial_service_time
      })
      this.setState({
        memorial_service_time,
        form
      })
    }
    this.setState({
      memorial_service_date
    })
  }

  changeZDHTime(e: any) {
    const time = e.detail.value
    const memorial_service_time = `${this.state.memorial_service_date} ${time}`
    const form = Object.assign({}, this.state.form, {
      memorial_service_time
    })
    this.setState({
      memorial_service_time: time,
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
          const data = JSON.parse(res.data)
          const form = Object.assign({}, self.state.form, {deceased_picture: data.data.image_url})
          self.setState({
            form
          }, function() {
            console.log('form: ', self.state)
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

  changeInput(key: string, e: any) {
    const value = e.detail.value
    const obj = {}
    obj[key] = value
    const form = Object.assign({}, this.state.form, obj)
    this.setState({
      form
    }, function() {
      console.log('changeInput: ', this.state)
    })
  }

  changeTemplate() {
    //
  }

  render() {
    return <View className='page-main add'>
      <Nav title={this.state.title} />
      <Form className='form-wrap border'>
        <View className='content'>
          <View className='form-item inline'>
            <Text className='label'>
              称谓
            </Text>
            <Input placeholder='请输入称谓' name='salutation' value={this.state.form.salutation} onBlur={this.changeInput.bind(this, 'salutation')} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              逝者姓名
            </Text>
            <Input placeholder='请输入逝者姓名' name='deceased_name' value={this.state.form.deceased_name} onBlur={this.changeInput.bind(this, 'deceased_name')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              性别
            </Text>
            <RadioGroup style='display: flex;' onChange={this.changeSex.bind(this)} name='gender'>
              {
                sexs.map((item: any) => {
                  return (
                    <View key={item.value}>
                      <Radio checked={item.value === this.state.form.gender} value={item.value}>{item.text}</Radio>
                    </View>
                  )
                })
              }
            </RadioGroup>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              出生日期
            </Text>
            <Picker mode='date' onChange={this.changBirth.bind(this)} value={this.state.form.birth_date}>
              <Input name='birth_date' placeholder='请选择日期' value={this.state.form.birth_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              逝世日期
            </Text>
            <Picker mode='date' onChange={this.changDeath.bind(this)} value={this.state.form.death_date}>
              <Input name='death_date' placeholder='请选择日期' value={this.state.form.death_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              寿数说明
            </Text>
            <Input name='life_number_descr' placeholder='请输入寿数说明' value={this.state.form.life_number_descr} onBlur={this.changeInput.bind(this, 'life_number_descr')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              灵堂位置
            </Text>
            <Input placeholder='请输入灵堂位置' name='spirit_hall_location' value={this.state.form.spirit_hall_location} onBlur={this.changeInput.bind(this, 'spirit_hall_location')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              追悼会日期
            </Text>
            <Picker mode='date' onChange={this.changeZDHDate.bind(this)} value={this.state.memorial_service_date}>
              <Input name='memorial_service_date' placeholder='请选择追悼会日期' value={this.state.memorial_service_date} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              追悼会时间
            </Text>
            <Picker mode='time' disabled={isEmpty(this.state.memorial_service_date)} onChange={this.changeZDHTime.bind(this)} value={this.state.memorial_service_time}>
              <Input name='memorial_service_time' disabled={isEmpty(this.state.memorial_service_date)} placeholder='请选择追悼会时间' value={this.state.memorial_service_time} />
            </Picker>
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              追悼会地点
            </Text>
            <Input name='memorial_place' placeholder='请输入追悼会地点' value={this.state.form.memorial_place} onBlur={this.changeInput.bind(this, 'memorial_place')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              主事人称谓
            </Text>
            <Input name='subject_title' placeholder='请输入主事人称谓' value={this.state.form.subject_title} onBlur={this.changeInput.bind(this, 'subject_title')} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              主事人姓名
            </Text>
            <Input name='principal_name' placeholder='请输入主事人姓名' value={this.state.form.principal_name} onBlur={this.changeInput.bind(this, 'principal_name')} />
          </View>
          <View className='form-item inline'>
            <Text className='label required'>
              主事人电话
            </Text>
            <Input name='principal_telephone' placeholder='请输入主事人电话' value={this.state.form.principal_telephone} onBlur={this.changeInput.bind(this, 'principal_telephone')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              治丧管家姓名
            </Text>
            <Input name='funeral_steward_name' placeholder='请输入治丧管家姓名' value={this.state.form.funeral_steward_name} onBlur={this.changeInput.bind(this, 'funeral_steward_name')} />
          </View>
          <View className='form-item inline'>
            <Text className='label'>
              治丧管家电话
            </Text>
            <Input name='funeral_housekeeper_phone' placeholder='请输入治丧管家电话' value={this.state.form.funeral_housekeeper_phone} onBlur={this.changeInput.bind(this, 'funeral_housekeeper_phone')} />
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              讣告备注
            </Text>
            <Textarea name='obituary_notes' placeholder='请输入讣告备注' value={this.state.form.obituary_notes} maxlength={200} onBlur={this.changeInput.bind(this, 'obituary_notes')} />
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              讣告模板
            </Text>
            <Text className='label remark'>(请选择讣告模板)</Text>
            <RadioGroup className='template-wrap' name='template_platform_id' onChange={this.changeTemplate.bind(this)}>
              {
                mobans.map((item: any) => {
                  return <View className='moban' onClick={this.changeMoban.bind(this, item.value)} key={item.value}>
                    <Image src={item.src} mode='aspectFit' />
                    <Radio checked={this.state.form.template_platform_id === item.value} value={item.value} id={'mb' + item.value} />
                  </View>
                })
              }
            </RadioGroup>
          </View>
          <View className='form-item no-border'>
            <Text className='label'>
              请选择逝者图片
            </Text>
            <Input name='deceased_picture' className='hide' value={this.state.form.deceased_picture} />
            {
              isEmpty(this.state.form.deceased_picture) ? <Image onClick={this.chooseImg.bind(this)} src={Upload} mode='widthFix' className='upload' /> : <Image onClick={this.chooseImg.bind(this)} src={this.state.form.deceased_picture} mode='widthFix' className='upload' />
            }
          </View>
        </View>
        <View className='bot'>
          <Btn text='保存草稿' onClick={this.submit.bind(this, 0)} round />
          <Btn text='发布' type='primary' onClick={this.submit.bind(this, 1)} round />
        </View>
      </Form>
    </View>
  }
}