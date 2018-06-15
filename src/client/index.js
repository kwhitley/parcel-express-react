import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.min.css'
import './styles/base.scss'
import './styles/base.less'

import React from 'react'
import ReactDom from 'react-dom'

import { combineReducers } from 'redux-immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'

// history
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

import mergedReducers from './state'
import App from './components/App'
import api from './state/api'
import route from './state/route'
import dashboards from './state/dashboards'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers(mergedReducers)
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

// history binding... messy, abstract elsewhere or turn into module
history.listen((location, action) => {
  let path = `${location.pathname}${location.search}${location.hash}`
  store.dispatch(route.actions.change(path))
})

store.dispatch(dashboards.addGroup('Newish Group', 1))
store.dispatch(dashboards.addTagToGroup(6,2))

let path = `${location.pathname}${location.search}${location.hash}`
store.dispatch(route.actions.change(path))

// register sagas
sagaMiddleware.run(api.sagas.watcherSaga)

ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
