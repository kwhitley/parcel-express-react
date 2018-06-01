import React from 'react';
import { Button } from 'semantic-ui-react';
import Item from './Item';

export default ({ items = [] }) =>
  <React.Fragment>
    <Button>Add Item</Button>
    <ul>
      { items.map(item => <Item key={item.id} item={item} />) }
    </ul>
  </React.Fragment>
