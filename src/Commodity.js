import React from 'react'
import { contains } from 'ramda'
import { Checkbox } from 'antd-mobile'

const { CheckboxItem } = Checkbox

export default (
  props => {
    const { activityId, onCommodityChoose, commodity, checkedList } = props
    const { id, name } = commodity

    return (
      <CheckboxItem onChange={ e => onCommodityChoose(e, activityId, commodity) } checked={ contains(id, checkedList) }>{ name }</CheckboxItem>
    )
  }
)
