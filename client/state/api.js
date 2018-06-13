import { Map, List, fromJS, Record } from 'immutable';
import { automap } from 'redux-automap';
import { createSelector } from 'reselect';
import axios from 'axios';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

export const namespace = 'api';

// const fetchPackageInfo = () => {
//   return axios.get('/package.json');
// }

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

// watcher saga: watches for actions dispatched to the store, starts worker saga
function *watcherSaga() {
  yield takeLatest('api/LOAD_PACKAGE_INFO', fetchPackageInfo);
}

function *fetchPackageInfo () {
  console.log('fetchPackageInfo saga triggered');
  try {
    const response = yield call(() => axios.get('/package.json'));
    console.log('response', response);
    // yield delay(1000);
    yield put({ type: "api/LOAD_PACKAGE_INFO_SUCCESS", data: fromJS(response.data) });
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
    reducer: state => state.set('package', new Resource({ isLoading: true }))
  },
  {
    loadPackageInfoSuccess: (data) => ({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data }),
    reducer: (state, action) => state.set('package', new Resource({ isLoading: false, success: true, data: action.data }))
  },
  {
    loadPackageInfoError: (error) => ({ type: 'api/LOAD_PACKAGE_INFO_ERROR', error }),
    reducer: (state, action) => state.set('package', new Resource({ error: action.error, success: false }))
  }
];

export default automap({ sagas, namespace, actionReducers, initialState });
