import { Map, List, fromJS } from 'immutable';
import { automap } from './redux-automap';

// optional declaration if you want to expose constants
const constants = {
  ADD_ITEM: '/LIST/ADD_ITEM',
  REMOVE_ITEM: '/LIST/REMOVE_ITEM',
};

// initial state for reducer
export const initialState = fromJS({
  items: [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' },
    { id: 4, name: 'cat' },
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

export default automap('list', { actionReducers, initialState, constants });
