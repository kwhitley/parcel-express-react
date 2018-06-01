import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import list from './list';

console.log('actions', list.actions);
console.log('reducers', list.reducers);
console.log('constants', list.constants);

// const rootReducer = combineReducers({
//   items: reducer
// });

const store = createStore(list.reducer);

store.subscribe(() => {
  console.log('NEW STATE >', store.getState());
});

const createItem = list.actions.addItem('mittens');
console.log('creating item >', createItem);
store.dispatch(createItem);

console.log('removing item');
store.dispatch(list.actions.removeItem(1));
