import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import Item from './Item';

export default ({ items = [], addItem, removeItem }) => {
  console.log('List:addItem', addItem);
  return (
    <React.Fragment>
      <Button fluid onClick={() => addItem('new item')}>Add Item</Button>
      <Divider horizontal>{ items.size } Items</Divider>
      <ul>
        {
          items.map(item => <Item
                              key={item.get('id')}
                              item={item}
                              removeItem={() => removeItem(item.get('id'))}
                               />
                    )
        }
      </ul>
    </React.Fragment>
  )
}
