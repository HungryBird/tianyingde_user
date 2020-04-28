import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Nav from '../../components/Nav/Nav'
import bgImg from '../../assets/images/mine/ditubeij.png'
import MenuList from '../../components/MenuList/MenuListItem'
import './fugao.scss'

export default class GoodList extends Mixins {
  constructor(props: any) {
    super(props)
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '讣告查询'
  }

  render() {
    const list = [
      {
        text: '奠金',
        path: '/pages/fugao/dianjin'
      },
      {
        text: '礼物',
        path: '/pages/fugao/liwu'
      },
      {
        text: '留言',
        path: '/pages/fugao/liuyan'
      }
    ]
    return(
      <View className='fugao page-main'>
        <Nav title='讣告查询' />
        <View className='content'>
          {
            list.map((item: any) => {
              return <MenuList label={item.text} path={item.path} />
            })
          }
        </View>
        <Image mode='widthFix' src={bgImg} className='bg-img' />
      </View>
    )
  }
}