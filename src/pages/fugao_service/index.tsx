import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import { isEmpty, getBirthSlot } from '../../utils/util'
import { getFugao } from '../../api/fugao/list'
import Home from '../../assets/images/fugao/huishouye.png'
import BG1 from '../../assets/images/fugao/muban1_da.png'
import BG2 from '../../assets/images/fugao/muban2_da.png'
import DiZhi from '../../assets/images/common/dizhi.png'
import './index.scss'

export default class FugaoService extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      template_platform_id: '1',
      form: {}
    }
  }

  config: Config = {
    navigationBarTitleText: '讣告详情'
  }

  componentDidMount() {
    const { template_platform_id, id } = this.$router.params
    console.log('template_platform_id: ', template_platform_id)
    if (!isEmpty(template_platform_id)) {
      this.setState({
        template_platform_id
      })
    }
    this.setState({
      form: this.$router.params
    })
    this.getFugao(id)
  }

  getFugao(id: string) {
    getFugao({id}).then((res: any) => {
      const { death_date, birth_date } = res.data
      if (!isEmpty(death_date) && !isEmpty(birth_date)) {
        const years = getBirthSlot(birth_date, death_date)
        res.data.years = years
      }
      this.setState({
        form: res.data
      })
    })
  }

  render() {
    const bot1 = [
      {

      }
    ]
    return (
      <View className='page-main'>
        <View className='fugao-service'>
          <View className='top'>
            <Image src={Home} mode='widthFix' className='home-btn' onClick={this.goback.bind(this)} />
          </View>
          <View className='content'>
            <View className={`inner bg${this.state.template_platform_id}`}>
              <View>
                <Text className='title'>
                  讣告
                </Text>
              </View>
              <View>
                <Image src={this.state.form.deceased_picture} mode='widthFix' className='deceased-picture' />
              </View>
              <View className='year-wrap'>
                <View>
                  { `${this.state.form.salutation}${this.state.form.deceased_name }` }
                </View>
                <View>
                  { `生于 ${this.state.form.birth_date}` }
                </View>
                <View>
                  { `逝于 ${this.state.form.death_date}` }
                </View>
                <View>
                  { `享年${this.state.form.years}岁` }
                </View>
              </View>
              <View className='position'>
                <View>
                  <View>
                    灵堂设于
                  </View>
                  <View className='place'>
                    <Image mode='widthFix' src={DiZhi} />
                    <Text>{ this.state.form.spirit_hall_location }</Text>
                  </View>
                  <View>
                    追悼会定于
                  </View>
                  <View>
                    { this.state.form.memorial_service_time }
                  </View>
                  <View className='place'>
                    <Image mode='widthFix' src={DiZhi} />
                    <Text>{ this.state.form.memorial_place }</Text>
                  </View>
                </View>
              </View>
              <View>
                <View>特此讣告</View>
                <View>
                  <Text>主事人{`${this.state.form.subject_title}:${this.state.form.principal_name}`}</Text>
                  <Text>
                    {this.state.form.principal_telephone}
                  </Text>
                </View>
                <View>
                  <Text>治丧管家{`${this.state.form.funeral_steward_name}`}</Text>
                  <Text>
                    {this.state.form.funeral_housekeeper_phone}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className='bot'>
            这是底部
          </View>
        </View>
        <Image src={this.state.template_platform_id === '1' ? BG1 : BG2} className='bg' />
      </View>
    )
  }
}