import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import mergedReducers from './state';
import { ConnectedMenu } from './components/Menu';
import { ConnectedPackage } from './components/Package';
import imageURL from './images/storm-trooper.png';
import api from './state/api';

console.log('mergedReducers', mergedReducers);
console.log('api.sagas', api.sagas);

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(mergedReducers);
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

// register sagas
sagaMiddleware.run(api.sagas.watcherSaga);

console.log('store initial state', store.getState());



let App = ({ name, children }) =>
  <div>
    <h1>{ name } Foo</h1>
    { children }
  </div>

if (module.hot) {
  console.info('hot reloading enabled');
  App = hot(module)(App);
}

render(
  <Provider store={store}>
    <App name="R34ct App">
      <ConnectedMenu />
      <ConnectedPackage />
      {/*<img src
      ={imageURL} width="50" height="50" />*/}
    </App>
  </Provider>,
  document.getElementById('app'));

fetch('/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.warn);
