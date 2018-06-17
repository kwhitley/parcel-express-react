import { fromJS, Record } from 'immutable'
import { automap } from 'redux-automap'
import { createSelector } from 'reselect'
import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

export const namespace = 'api'

const byName = (a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
const toDepsArray = deps => deps && Object
                                      .entries(deps.toJS())
                                      .map(i => ({ name: i[0], version: i[1] }))
                                      .sort(byName)

const getPackage = state => state.getIn(['package'])
const getTimesLoaded = state => state.get('timesLoaded')
const getDependencies = state => state.getIn([ 'package', 'data', 'dependencies' ])
const getDevDependencies = state => state.getIn([ 'package', 'data', 'devDependencies' ])
const getDependenciesAsArray = createSelector([ getDependencies ], toDepsArray)
const getDevDependenciesAsArray = createSelector([ getDevDependencies ], toDepsArray)

const selectors = {
  getPackage,
  getTimesLoaded,
  getDependencies,
  getDevDependencies,
  getDependenciesAsArray,
  getDevDependenciesAsArray,
}

const Resource = Record({
  isLoading: false,
  success: undefined,
  error: undefined,
  data: undefined,
})

// initial state for reducer
export const initialState = fromJS({
  package: new Resource(),
  timesLoaded: 0,
})

function* fetchPackageInfo() {
  console.log('fetchPackageInfo saga triggered')
  try {
    const data = yield call(() => axios.get('/package.json').then(r => fromJS(r.data)))
    yield put({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data })
  } catch (error) {
    console.log('error', error)
    yield put({ type: 'api/LOAD_PACKAGE_INFO_ERROR', error: error.message })
    // throw new Error(error)
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  yield takeLatest('api/LOAD_PACKAGE_INFO', fetchPackageInfo)
}

const sagas = {
  watcherSaga,
  fetchPackageInfo
}

// define all action/reducer pairs here... add 'type' attributes for
export const actionReducers = [
  {
    loadPackageInfo: () => ({ type: 'api/LOAD_PACKAGE_INFO' }),
    reducer: state => state.set('package', new Resource({ isLoading: true, data: state.getIn([ 'package', 'data' ]) }))
  },
  {
    loadPackageInfoSuccess: data => ({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data }),
    reducer: (state, action) => state
                                  .set('package', new Resource({ isLoading: false, success: true, data: action.data }))
                                  .update('timesLoaded', count => count + 1)
  },
  {
    loadPackageInfoError: error => ({ type: 'api/LOAD_PACKAGE_INFO_ERROR', error }),
    reducer: (state, action) => state.set('package', new Resource({ error: action.error, success: false }))
  },
]

export default automap({ sagas, namespace, actionReducers, initialState, selectors })
