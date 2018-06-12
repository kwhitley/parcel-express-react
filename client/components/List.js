import React from 'react';
import { Button } from 'semantic-ui-react';
import Item from './Item';

export default ({ items = [], addItem, removeItem }) => {
  console.log('List:addItem', addItem);
  return (
    <React.Fragment>
      <Button onClick={() => addItem('new item')}>Add Item</Button>
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
