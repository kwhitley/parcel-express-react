import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ children }) =>
  <Message negative>
    <Message.Header>We've encountered an error.</Message.Header>
    <p>{ children }</p>
  </Message>
