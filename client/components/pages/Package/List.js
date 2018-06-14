import React from 'react'
import { List, Header } from 'semantic-ui-react'

export default ({ name, libs }) =>
  <React.Fragment>
    <Header>{ name }</Header>
    <List>
      {
        libs && libs.map(lib => (
          <List.Item key={lib.name}><b>{ lib.name }</b>: { lib.version }</List.Item>
        ))
      }
    </List>
  </React.Fragment>
