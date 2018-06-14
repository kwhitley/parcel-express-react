import React from 'react'
import { Button, Divider, Input, Table, Transition } from 'semantic-ui-react'
import Item from './Item'
import AddItem from './AddItem'

export default ({ items = [], addItem, removeItem, toggleIsActive }) =>
  <React.Fragment>
    <AddItem addItem={addItem} />
    <Divider horizontal>{ items.length } Items</Divider>
    <Table compact celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Created</Table.HeaderCell>
          <Table.HeaderCell>Active</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {
        items.map(item => <Item
                            key={item.id}
                            item={item}
                            removeItem={() => removeItem(item.id)}
                            toggleIsActive={() => toggleIsActive(item.id)}
                            />
                  )
      }
      </Table.Body>
    </Table>
  </React.Fragment>
