import Taro, { Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Mixins from '../../mixins/mixin'
import Menu from '../../components/Menu/Menu'
import Nav from '../../components/Nav/Nav'
import './list.scss'
import { obituaries, accepts, deleteObituarie, updateAccept } from '../../api/fugao/list'
import Btn from '../../components/Btn/Btn'
import Modal from '../../components/Modal/Modal'

export default class OnlineList extends Mixins {
  constructor(props: any) {
    super(props)

    this.state = {
      id: '',
      accept: {},
      status: 1,
      list: {
        data: [],
        page: 1,
        total: 0,
        size: 10,
        status: 'more',
        loading: false
      },
      modal: {
        visible: false
      }
    }
  }

  config: Config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '在线讣告'
  }

  getList() {
    const getList = this.state.status === 2 ?  accepts : obituaries
    getList({
      status: this.state.status,
      page: this.state.list.page,
      size: this.state.list.size
    }).then((res: any) => {
      if (this.state.status === 2) {
        const data = res.data.map((item: any) => {
          for (const key in item.obituary) {
            item[key] = item.obituary[key]
          }
          return item
        })
        res.data = data
        this.handleDefaultList(res)
      } else {
        this.handleDefaultList(res)
      }
    })
  }

  changeMenu(item: any) {
    this.setState({
      status: item.id
    }, function() {
      this.initList().then(() => {
        this.getList()
      })
    })
  }

  scrollToLower() {
    if (this.state.list.type !== 'more') return
    this.getList()
  }

  changeModalVisible(visible: boolean = true) {
    const modal = Object.assign({}, this.state.modal, {
      visible
    })
    this.setState({
      modal
    })
  }

  openModal(item: any, e: any) {
    if (this.state.status === 2) {
      this.setState({
        accept: item
      })
    } else {
      this.setState({
        id: item.id
      }, () => {
        this.changeModalVisible()
      })
    }
  }

  confirm() {
    const submit = this.state.status === 2 ? updateAccept : deleteObituarie
    let data = {}
    if (this.state.status === 2) {
      data = Object.assign({}, this.state.accept)
    } else {
      data['id'] = this.state.id
    }
    submit(data).then((res: any) => {
      this.initList().then(() => {
        Taro.showToast({
          title: res.message
        })
        this.getList()
      })
    })
  }

  clickItem(item: any) {
    //
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
        id: 0,
        active: false
      }
    ]
    return(
      <View className='list page-main'>
        <Nav title='讣告' />
        <View className='scroll-wrap'>
          <Menu onChange={this.changeMenu.bind(this)} style='margin: 10px auto;' data={data} />
          <ScrollView onScrollToLower={this.scrollToLower.bind(this)} scrollY>
            {
              this.state.list.data.map((item: any) => {
                return <View className='block' onClick={this.clickItem.bind(this, item)}>
                  <View className='left'>
                    <View className='label'>讣告编号：{ item.auto_number }</View>
                    <View className='label primary'>时间：{ item.created_at }</View>
                    <View className='label primary'>姓名：{ item.deceased_name }</View>
                    {
                      this.state.type !== 2 ? <View className='label primary'>主事人：{ item.principal_name }</View> : null
                    }
                  </View>
                  <View className='right'>
                    <Btn text={this.state.status === 2 ? '取消' : '删除'} round type='primary' size='mini' onClick={this.openModal.bind(this, item)} />
                  </View>
                </View>
              })
            }
          </ScrollView>
        </View>
        <Modal title={this.state.status === 2 ? '确认取消' : '确认删除'} content={this.state.status === 2 ? '是否取消此赴约？' : '是否删除此讣告'} visible={this.state.modal.visible} onChange={this.changeModalVisible.bind(this)} onOk={this.confirm.bind(this)} />
        {
          this.state.status === 1 ? <View className='bot'>
            <Btn text='新增' round type='primary' onClick={this.navigateTo.bind(this, '/pages/fugao/add', { action: 'add' })} />
          </View> : null
        }
      </View>
    )
  }
}