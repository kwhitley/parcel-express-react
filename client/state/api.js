import { Map, List, fromJS, Record } from 'immutable';
import { automap } from 'redux-automap';
import { createSelector } from 'reselect';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

export const namespace = 'api';

const fetchPackageInfo = () => {
  return axios.get('/package.json');
}

const Resource = Record({
  isLoading: false,
  success: undefined,
  error: undefined,
  data: undefined
});

// initial state for reducer
export const initialState = fromJS({
  package: new Resource
});

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    loadPackageInfo: () => ({ type: 'api/LOAD_PACKAGE_INFO' }),
    reducer: state => state.set('package', new Resource({ isLoading: true }))
  },
  {
    loadPackageInfoSuccess: (data) => ({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data }),
    reducer: (state, action) => state.set('package', new Resource({ isLoading: false, success: true, data: action.data }))
  }
];

export default automap({ namespace, actionReducers, initialState });
