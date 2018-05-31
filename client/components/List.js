import React from 'react';
import { Button } from 'semantic-ui-react';
import { ListConsumer } from './ListContext';
import Item from './Item';

export default ({ items = [] }) =>
  <ListConsumer>
    {({ items, addItem, removeItem }) => (
      <React.Fragment>
        <ul>
          { items.map(item => <Item key={item.id} item={item} removeItem={removeItem} />) }
        </ul>
        <Button onClick={addItem}>Add Item</Button>
      </React.Fragment>
    )}
  </ListConsumer>
