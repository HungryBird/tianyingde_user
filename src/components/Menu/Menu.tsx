import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import propTypes from 'prop-types'
import './menu.scss'

export default function Menu (props: any) {
  const [menus, setMenus] = useState(props.data)

  useEffect(() => {
    props.onChange(menus.filter((item: any) => {
      return item.active
    })[0])
  }, [menus])

  function itemClick(item: any) {
    setMenus(menus.map((menu: any) => {
      menu.active = item.id === menu.id
      return menu
    }))
  }

  return <View className={`menu-wrap ${props.className}`} style={props.style}>
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
  onChange: propTypes.func,
  data: propTypes.array
}

Menu.defaultProps = {
  data: []
}