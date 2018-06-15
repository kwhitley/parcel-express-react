import React from 'react'
import { List, Header, Statistic } from 'semantic-ui-react'

export default ({ name, libs }) =>
  <div>
    <Statistic horizontal color='green' label={name} value={libs.length} />
    <List>
      {
        libs && libs.map(lib => (
          <List.Item key={lib.name}><b>{ lib.name }</b>: { lib.version }</List.Item>
        ))
      }
    </List>
  </div>

