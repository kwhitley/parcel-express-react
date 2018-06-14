import React from 'react'
import { List, Header } from 'semantic-ui-react'

export default ({ name, items }) =>
  <React.Fragment>
    <Header>{ name }</Header>
    <List>
      {
        items && Object.keys(items).map(k => (
          <List.Item key={k}><b>{ k }</b>: { items[k] }</List.Item>
        ))
      }
    </List>
  </React.Fragment>
