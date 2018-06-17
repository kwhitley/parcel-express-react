import { fromJS, Record } from 'immutable'
import { automap } from 'redux-automap'
import { createSelector } from 'reselect'

export const namespace = 'list'

const getItems = state => state.get('items')
const getNumItems = state => state.get('items').size
const getHalfItems = (items, number) => items.slice(0, Math.floor(number / 2))

const getItemsSorted = createSelector(
  [ getItems ],
  items => items.sort((A, B) => {
    const a = B.get('name')
    const b = A.get('name')

    return a < b ? -1 : (a > b ? 1 : 0)
  }).reverse()
)

const getHalfItemsUnsorted = createSelector(
  [ getItems, getNumItems ], getHalfItems
)

const getHalfItemsSorted = createSelector(
  [ getItemsSorted, getNumItems ], getHalfItems
)

export const selectors = {
  getItems, getNumItems, getItemsSorted, getHalfItemsUnsorted, getHalfItemsSorted
}

const Entry = new Record({
  id: undefined,
  name: 'new item',
  date: new Date(),
  isActive: false,
})

// initial state for reducer
export const initialState = fromJS({
  items: [
    { id: 1, name: 'foo', date: new Date(), isActive: true },
    { id: 2, name: 'bar', date: new Date(), isActive: true },
    { id: 3, name: 'baz', date: new Date(), isActive: true },
    { id: 4, name: 'cat', date: new Date(), isActive: false },
    { id: 5, name: 'miffles', date: new Date(), isActive: false },
    { id: 6, name: 'vlad', date: new Date(), isActive: true },
    { id: 7, name: 'baxter', date: new Date(), isActive: true },
  ],
})

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    addItem: (name = 'new item') => ({ type: 'list/ADD_ITEM', name }),
    reducer: (state, action) => {
      let nextID = state.get('items').maxBy(i => i.get('id')).get('id') + 1

      return state.update('items', items => items.push(new Entry({
        id: nextID,
        name: action.name,
        date: new Date(),
      })))
    }
  },
  {
    toggleIsActive: (id) => ({ type:  'list/TOGGLE_ITEM_IS_ACTIVE', id }),
    reducer: (state, action) => state.update('items', items => items.map(item => item.get('id') === action.id ? item.update('isActive', active => !active) : item))
  },
  {
    // type: constants.REMOVE_ITEM,
    removeItem: id => ({ type: 'list/REMOVE_ITEM', id }),
    reducer: (state, action) => state.update('items', items => items.filter(i => i.get('id') !== action.id))
  }
]

export default automap({ namespace, actionReducers, initialState, selectors, foo: 'bar' })
