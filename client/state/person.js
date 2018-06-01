import { Map, List, fromJS } from 'immutable';
import reduxHelper from './redux-helper';

export const initialState = Map({
  name: 'Kevin',
  age: 38
});

export const actionReducers = [
  {
    changeName: (name) => ({ type: 'CHANGE_NAME', name }),
    reducer: (state, action) => state.set('name', action.name)
  },
  {
    growOlder: () => ({ type: 'GROW_OLDER' }),
    reducer: (state, action) => state.set('age', state.get('age') + 1);
  }
];

export default { actions, reducers, reducer } = reduxHelper(actionReducers, initialState);
