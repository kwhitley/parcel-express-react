import { Map, List, fromJS, Record } from 'immutable';
import { automap } from 'redux-automap';
import { createSelector } from 'reselect';

export const namespace = 'list';

const getItems = state => state.get('items');
const getNumItems = state => state.get('items').size;
const getHalfItems = (items, number) => items.slice(0, Math.floor(number / 2));

const getItemsSorted = createSelector(
  [ getItems ], items => {
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
  [ getItemsSorted, getNumItems ], getHalfItems
);

export const selectors = {
  getItems, getNumItems, getItemsSorted, getHalfItemsUnsorted, getHalfItemsSorted
};

const Entry = new Record({ id: undefined, name: 'new item', date: new Date });

// optional declaration if you want to expose constants
const constants = {
  ADD_ITEM: '/LIST/ADD_ITEM',
  REMOVE_ITEM: '/LIST/REMOVE_ITEM',
};

// initial state for reducer
export const initialState = fromJS({
  items: [
    { id: 1, name: 'foo', date: new Date },
    { id: 2, name: 'bar', date: new Date },
    { id: 3, name: 'baz', date: new Date },
    { id: 4, name: 'cat', date: new Date },
    { id: 5, name: 'miffles', date: new Date },
    { id: 6, name: 'vlad', date: new Date },
    { id: 7, name: 'baxter', date: new Date },
  ]
});

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    type: constants.ADD_ITEM,
    addItem: (name = 'new item') => ({ type: constants.ADD_ITEM, name }),
    reducer: (state, action) => {
      let nextID = state.get('items').maxBy(i => i.get('id')).get('id') + 1;

      return state.update('items', items => items.push(new Entry({
        id: nextID,
        name: action.name,
        date: new Date,
      })));
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
