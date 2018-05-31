import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

import List from './components/List';
import imageURL from './images/storm-trooper.png';

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
    <List items={[1,2,3,4,5]} />
    {/*<img src={imageURL} width="50" height="50" />*/}
  </App>,
  document.getElementById('app'));

fetch('/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.warn);
