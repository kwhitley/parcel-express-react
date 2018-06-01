import React from 'react';
import { Button } from 'semantic-ui-react';
import { ListConsumer } from './ListContext';
import Item from './Item';

export default ({ items = [] }) =>
  <ListConsumer>
    {({ items, addItem, removeItem }) => (
      <React.Fragment>
        <Button onClick={addItem}>Add Item</Button>
        <ul>
          { items.map(item => <Item key={item.id} item={item} removeItem={removeItem} />) }
        </ul>
      </React.Fragment>
    )}
  </ListConsumer>
