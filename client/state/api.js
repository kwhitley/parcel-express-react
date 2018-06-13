import { Map, List, fromJS, Record } from 'immutable';
import { automap } from 'redux-automap';
import { createSelector } from 'reselect';
import axios from 'axios';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

export const namespace = 'api';

// const fetchPackageInfo = () => {
//   return axios.get('/package.json');
// }

const selectors = {
  getPackage: state => state.getIn(['package']),
  getTimesLoaded: state => state.get('timesLoaded'),
  getDependencies: state => state.getIn(['package', 'data', 'dependencies']),
  getDevDependencies: state => state.getIn(['package', 'data', 'devDependencies']),
};

const Resource = Record({
  isLoading: false,
  success: undefined,
  error: undefined,
  data: undefined
});

// initial state for reducer
export const initialState = fromJS({
  package: new Resource,
  timesLoaded: 0,
});

// watcher saga: watches for actions dispatched to the store, starts worker saga
function *watcherSaga() {
  yield takeLatest('api/LOAD_PACKAGE_INFO', fetchPackageInfo);
}

function *fetchPackageInfo () {
  console.log('fetchPackageInfo saga triggered');
  try {
    const data = yield call(() => axios.get('/package.json').then(r => fromJS(r.data)));
    yield put({ type: "api/LOAD_PACKAGE_INFO_SUCCESS", data });
  } catch (error) {
    console.log('error', error);
    yield put({ type: "api/LOAD_PACKAGE_INFO_ERROR", error: error.message });
    // throw new Error(error);
  }
}

const sagas = {
  watcherSaga,
  fetchPackageInfo
};

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    loadPackageInfo: () => ({ type: 'api/LOAD_PACKAGE_INFO' }),
    reducer: state => state.set('package', new Resource({ isLoading: true, data: state.getIn(['package', 'data']) }))
  },
  {
    loadPackageInfoSuccess: (data) => ({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data }),
    reducer: (state, action) => state
                                  .set('package', new Resource({ isLoading: false, success: true, data: action.data }))
                                  .update('timesLoaded', count => count + 1)
  },
  {
    loadPackageInfoError: (error) => ({ type: 'api/LOAD_PACKAGE_INFO_ERROR', error }),
    reducer: (state, action) => state.set('package', new Resource({ error: action.error, success: false }))
  }
];

export default automap({ sagas, namespace, actionReducers, initialState, selectors });
