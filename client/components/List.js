import React from 'react';

const Item = ({ name }) =>
  <li><b>{ name }</b></li>

export default ({ items = [] }) =>
  <ul>
    { items.map(item => <Item key={item} name={item} />) }
  </ul>
