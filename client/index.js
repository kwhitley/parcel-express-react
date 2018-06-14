import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga';

import mergedReducers from './state';
import App from './components/App';
import imageURL from './images/storm-trooper.png';
import api from './state/api';

console.log('mergedReducers', mergedReducers);
console.log('api.sagas', api.sagas);

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(mergedReducers);
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

// register sagas
sagaMiddleware.run(api.sagas.watcherSaga);

console.log('store initial state', store.getState());

const HotApp = module.hot ? hot(module)(App) : App;

if (module.hot) {
  console.info('hot reloading enabled');
}

render(
  <Provider store={store}>
    <HotApp history={history} />
  </Provider>,
  document.getElementById('app'));

fetch('/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.warn);
