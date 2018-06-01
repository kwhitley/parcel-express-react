import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import mergedReducers from './index';
import list from './cats';

const {
  getItems,
  getNumItems,
  getSortedItems,
  getHalfItemsUnsorted,
  getHalfItemsSorted,
} = list.selectors;

console.log('actions', list.actions);
console.log('reducers', list.reducers);
console.log('constants', list.constants);

const rootReducer = combineReducers(mergedReducers);
const store = createStore(rootReducer);

store.subscribe(() => {
  console.log('NEW STATE >', store.getState());
});

const createItem = list.actions.addItem('mittens');
console.log('creating item >', createItem);
store.dispatch(createItem);

console.log('removing item');
store.dispatch(list.actions.removeItem(1));

let state = store.getState();

console.log('getItems > ', getItems(state));
console.log('getNumItems > ', getNumItems(state));
console.log('getSortedItems > ', getSortedItems(state));
console.log('getHalfItemsSorted > ', getHalfItemsSorted(state));
console.log('getHalfItemsUnsorted > ', getHalfItemsUnsorted(state));

let sortedA = getSortedItems(state);
let sortedB = getSortedItems(state);

console.log('sorted equal?', sortedA === sortedB);

console.log('extra test... foo =', list.foo);
