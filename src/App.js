import React, { Component } from 'react'
import { WhiteSpace } from 'antd-mobile'
import { intersperse, map, compose, dissoc, propEq, find, filter, not, isNil, dropRepeats, dropWhile, concat, contains, append, prop, assoc } from 'ramda'
import { log } from 'mulan-lib'
import mockData, { createCommodity } from './lib/mock-data'
import formatData from './lib/format-data'
import Activity  from './Activity'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: formatData(mockData()),
      checkedList: [],
      addOn: {},
    }
    this.state.activities = map(activity => dissoc('commodities', activity), this.state.data)
    this.handleCommodityChoose = this.handleCommodityChoose.bind(this)
    this.handleAddOn = this.handleAddOn.bind(this)

    log('im data',       this.state.data)
    log('im activities', this.state.activities)
  }
  checkMutex({ id, mutex, type }) {
    const { activities } = this.state

    return compose(dropRepeats, concat([id]))(
      map(({ id, mutex: mutex1, type: type1 }) => {
               if (mutex[type1] === 0 && mutex1[type] === 0) return id
             }, activities)
    )
  }
  handleAddOn(activityId) {
    const { addOn } = this.state
    const currentActivity = prop(activityId, addOn) || []
    const createdCommodity = createCommodity()

    this.setState({
      addOn: assoc(activityId, append(createdCommodity, currentActivity), addOn)
    })

  }
  handleCommodityChoose({ target }, activityId, commodity) {
    const { checked } = target
    const { activities, checkedList } = this.state
    const { id } = commodity

    if(!checked) {
      this.setState({ checkedList: dropWhile(o => o.commodityId === id, checkedList) })
      return
    }

    const currentActivity = find(propEq('id', activityId), activities)
    const noMutexList = filter(o => not(isNil(o)), this.checkMutex(currentActivity))

    this.setState({
      checkedList: append({ activityId, commodityId: id }, filter(({ activityId }) => contains(activityId, noMutexList), checkedList))
    })
  }
  render() {
    const { checkedList, addOn } = this.state
    log('addOn', this.state.addOn)
    return (
      <div className="App">
        {
          compose(
            intersperse(<WhiteSpace size='md' />),
            map(activity => <Activity key={ activity.id } { ...activity } addOn={ addOn } checkedList={ map(({ commodityId }) => commodityId, checkedList) } onAddOn={ this.handleAddOn } onCommodityChoose={ this.handleCommodityChoose } />)
          )(this.state.data)
        }
      </div>
    )
  }
}

export default App;
