import Taro, { Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Menu from '../../components/Menu/Menu'
import Nav from '../../components/Nav/Nav'
import './list.scss'
import { obituaries, accepts } from '../../api/fugao/list'
import Button from '../../components/Button/Button'

export default class OnlineList extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      type: 1,
      list: {
        data: [],
        page: 1,
        total: 0,
        size: 10,
        status: 'more',
        loading: false
      }
    }
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '在线讣告'
  }

  getList() {
    const getList = this.state.type === 1 ? obituaries : accepts
    getList({
      page: this.state.list.page,
      size: this.state.list.size
    }).then((res: any) => {
      this.handleDefaultList(res)
    })
  }

  changeMenu(item: any) {
    this.setState({
      type: item.id
    }, function() {
      this.initList().then(() => {
        this.getList()
      })
    })
  }

  scrollToLower() {
    this.getList()
  }

  render() {
    const data = [
      {
        text: '已发布',
        id: 1,
        active: true
      },
      {
        text: '赴约',
        id: 2,
        active: false
      },
      {
        text: '草稿',
        id: 3,
        active: false
      }
    ]
    return(
      <View className='list main-page'>
        <Nav title='讣告' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu.bind(this)} style='margin: 10px auto;' data={data} />
          <ScrollView onScrollToLower={this.scrollToLower} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block'>
                  <View className='left'>
                    <View className='label'>讣告编号：{ item.auto_number }</View>
                    <View className='label primary'>时间：{ item.created_at }</View>
                    <View className='label primary'>姓名：{ item.deceased_name }</View>
                    {
                      this.state.type !== 2 ? <View className='label primary'>主事人：{ item.principal_name }</View> : null
                    }
                  </View>
                  <View className='right'>
                    <Button text={this.state.type === 2 ? '取消' : '删除'} round type='primary' size='mini' />
                  </View>
                </View>
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}