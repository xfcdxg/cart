import { range, nth, multiply, compose, map, assoc, reduce, concat, add } from 'ramda'

let commodityId = 0

const activities = [
  {
    name: '满减',
    mutex: [1, 0, 1, 0],
  }, {
    name: '加价购',
    mutex: [0, 0, 1, 1],
  }, {
    name: '专区',
    mutex: [1, 1, 1, 1],
  },
  {
    name: '活动ABC',
    mutex: [0, 1, 1, 1],
  },
]

const origin = {
  name: 'I`m test',
  activity: {},
}

const scope = (max, step = 0) => compose(add(step), parseInt, multiply(max))(Math.random())

export const createCommodity = () => {
  const id = `${ commodityId++ }`
  const name = `${ origin.name }${ id }`
  return { id, name }
}

const createActivity = (id, name, mutex, type) => ({ id: `000${ id }`, name: `${ name }${ id }`, mutex, type })

const createData = id => {
  const type = scope(activities.length)
  const { name, mutex } = nth(type, activities)
  const activity = createActivity(id, name, mutex, type)

  return compose(
           map(commodity => assoc('activity', activity, commodity)),
           map(createCommodity)
         )(range(0, scope(10, 1)))
}


export default (
  () => reduce((o, c) => concat(o, c), [], map(createData, range(0, 10)))
)
