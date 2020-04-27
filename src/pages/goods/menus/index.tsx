import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import propTypes from 'prop-types'
import './index.scss'

export default function Menu (props: any) {
  const [menus, setMenus] = useState([
    {
      id: 0,
      text: '全部',
      active: true
    },
    {
      id: 1,
      text: '待付款',
      active: false
    },
    {
      id: 2,
      text: '待发货',
      active: false
    },
    {
      id: 3,
      text: '待收货',
      active: false
    },
    {
      id: 4,
      text: '待评价',
      active: false
    }
  ])

  useEffect(() => {
    props.onChange(menus.filter((item: any) => {
      return item.active
    })[0])
  }, [menus])

  function itemClick(item: any) {
    setMenus(menus.map(menu => {
      menu.active = item.id === menu.id
      return menu
    }))
  }

  return <View className={`good-list-menu-wrap ${props.className}`} style={props.style}>
    {
      menus.map((item: any) => {
        return <View onClick={itemClick.bind(this, item)} className={`item ${item.active ? 'active' : ''}`}>
          { item.text }
        </View>
      })
    }
  </View>
}

Menu.propTypes = {
  style: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
  onChange: propTypes.func
}

Menu.defaultProps = {

}