import React from 'react';
import { Button, Divider, Input, Table } from 'semantic-ui-react';
import Item from './Item';
import AddItem from './AddItem';

export default ({ items = [], addItem, removeItem }) => {
  console.log('List:addItem', addItem);
  return (
    <React.Fragment>
      <AddItem addItem={addItem} />
      <Divider horizontal>{ items.size } Items</Divider>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            items.map(item => <Item
                                key={item.get('id')}
                                item={item}
                                removeItem={() => removeItem(item.get('id'))}
                                 />
                      )
          }
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}
