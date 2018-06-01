import { Map, List, fromJS } from 'immutable';
import { automap } from './redux-automap';
import { createSelector } from 'reselect';

export const namespace = 'cats';

const getItems = state => state.getIn([ namespace, 'items' ]);
const getHalfItems = (items, number) => items.slice(0, Math.floor(number / 2));
const getNumItems = createSelector([ getItems ], (items) => items.size);
const getSortedItems = createSelector(
  [ getItems ], (items) => {
    return items.sort((a, b) => {
      a = a.get('name');
      b = b.get('name');

      return a < b ? -1 : (a > b ? 1 : 0);
    }).reverse();
  }
);

const getHalfItemsUnsorted = createSelector(
  [ getItems, getNumItems ], getHalfItems
);

const getHalfItemsSorted = createSelector(
  [ getSortedItems, getNumItems ], getHalfItems
);

export const selectors = {
  getItems, getNumItems, getSortedItems, getHalfItemsUnsorted, getHalfItemsSorted
};

// optional declaration if you want to expose constants
const constants = {
  ADD_ITEM: '/CATS/ADD_ITEM',
  REMOVE_ITEM: '/CATS/REMOVE_ITEM',
};

// initial state for reducer
export const initialState = fromJS({
  items: [
    { id: 1, name: 'fuzball' },
    { id: 2, name: 'vlad' },
    { id: 3, name: 'doha' },
    { id: 4, name: 'mittens' },
  ]
});

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    type: constants.ADD_ITEM,
    addItem: (name = 'new item') => ({ type: constants.ADD_ITEM, name }),
    reducer: (state, action) => {
      let nextID = state.get('items').maxBy(i => i.id).get('id') + 1;

      return state.update('items', items => items.push(Map({ id: nextID, name: action.name })));
    }
  },
  {
    // type: constants.REMOVE_ITEM,
    removeItem: (id) => ({ type: constants.REMOVE_ITEM, id }),
    reducer: (state, action) => {
      return state.update('items', items => items.filter(i => i.get('id') !== action.id));
    }
  }
];

export default automap({ namespace, actionReducers, initialState, constants, selectors, foo: 'bar' });
