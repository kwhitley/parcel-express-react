import React from 'react';
import { Button } from 'semantic-ui-react';

export default ({ item, removeItem }) =>
  <li>
    { item.get('name') }
    <Button icon="trash outline" onClick={() => removeItem(item.id)}></Button>
  </li>
