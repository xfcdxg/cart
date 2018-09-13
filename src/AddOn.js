import React from 'react'
import { List } from 'antd-mobile'

const { Item } = List

export default (
  props => {
    const { commodity } = props
    const { id, name } = commodity
    
    return (
      <Item><div style={{ textAlign: 'right' }}>{ name }</div></Item>
    )
  }
)
