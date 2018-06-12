import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import humanize from 'humanize-duration';

export default ({ item, removeItem }) =>
  <Table.Row>
    <Table.Cell width={1}>
      <Button circular icon="trash" fluid size="mini" onClick={() => removeItem(item.id)} />
    </Table.Cell>
    <Table.Cell>{ item.get('id') }</Table.Cell>
    <Table.Cell>{ item.get('name') }</Table.Cell>
    <Table.Cell>created { humanize(new Date - item.get('date'), { round: true }) } ago</Table.Cell>
  </Table.Row>
