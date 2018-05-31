import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

import Menu from './components/Menu';
import imageURL from './images/storm-trooper.png';

import 'semantic-ui-css/semantic.min.css';

let App = ({ name, children }) =>
  <div>
    <h1>{ name } Foo</h1>
    { children }
  </div>

if (module.hot) {
  console.info('hot reloading enabled');
  App = hot(module)(App);
}

render(<App name="R34ct App">
    <Menu />
    {/*<img src
    ={imageURL} width="50" height="50" />*/}
  </App>,
  document.getElementById('app'));

fetch('/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.warn);
