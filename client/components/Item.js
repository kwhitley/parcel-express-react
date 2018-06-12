import React from 'react';
import { Button } from 'semantic-ui-react';

export default ({ item, removeItem }) =>
  <li>
    <Button circular size="mini" icon="trash" onClick={() => removeItem(item.id)}></Button>
    { item.get('name') }:{ item.get('id') }
  </li>
