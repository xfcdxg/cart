import React from 'react'
import { map, prop } from 'ramda'
import { Card, List } from 'antd-mobile'
import Commodity from './Commodity'
import AddOn from './AddOn'

export default (
  props => {
    const { id, name, type, commodities, onCommodityChoose, onAddOn, addOn, checkedList } = props
    const addOnList = prop(id, addOn) || []

    return (
      <Card full>
        <Card.Header title={ name } extra={ type === 1 ? <span style={{ fontSize: '14px', color: '#55ceff', cursor: 'pointer' }} onClick={ () => onAddOn(id) }>加购</span> : '' } />
        <Card.Body>
          <List>
            { map(commodity => <Commodity { ...{ activityId: id, commodity, onCommodityChoose, checkedList } } key={ commodity.id } />, commodities) }
            <div>
              { map(commodity => <AddOn { ...{ commodity } } />, addOnList) }
            </div>
          </List>
        </Card.Body>
      </Card>
    )
  }
)
