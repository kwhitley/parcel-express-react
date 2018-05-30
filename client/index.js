import React from 'react';
import { render } from 'react-dom';

const App = ({ name }) =>
  <h1>{ name }</h1>

render(<App name="R34ct App" />, document.getElementById('app'));

fetch('/test')
  .then(r => r.json())
  .then(console.log)
  .catch(console.warn);
