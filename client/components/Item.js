import React from 'react';
import { Button, Icon, Table, Checkbox } from 'semantic-ui-react';
import humanize from 'humanize-duration';

export default ({ item, removeItem, toggleIsActive }) => {
  return (
    <Table.Row>
      <Table.Cell width={1}>
        <Button circular icon="trash" fluid size="mini" onClick={removeItem} />
      </Table.Cell>
      <Table.Cell>{ item.id }</Table.Cell>
      <Table.Cell>{ item.name }</Table.Cell>
      <Table.Cell>created { humanize(new Date - item.date, { round: true }) } ago</Table.Cell>
      <Table.Cell width={1}>
        <Checkbox
          toggle
          checked={item.isActive}
          onClick={toggleIsActive}
          />
      </Table.Cell>
    </Table.Row>
  )
}

