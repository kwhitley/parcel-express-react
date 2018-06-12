import React from 'react';
import { Button, Divider, Input } from 'semantic-ui-react';
import Item from './Item';
import AddItem from './AddItem';

export default ({ items = [], addItem, removeItem }) => {
  console.log('List:addItem', addItem);
  return (
    <React.Fragment>
      <AddItem addItem={addItem} />
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
