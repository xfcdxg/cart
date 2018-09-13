import { reduce, prop, isNil, compose, append,__ , assoc, merge, values } from 'ramda'

const format = (o, curr) => {
  const { activity } = curr
  const { id } = activity
  const existsActivity = prop(`${ id }`, o)

  if (isNil(existsActivity)) {
    return compose(assoc(id, __, o), merge(activity), assoc('commodities', [ curr ]))({})
  } else {
    return compose(assoc(id, __, o), assoc('commodities', __, existsActivity), append(curr), prop('commodities'))(existsActivity)
  }
}

export default (
  list => values(reduce(format, {}, list))
)
