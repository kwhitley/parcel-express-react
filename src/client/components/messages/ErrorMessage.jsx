import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ children }) =>
  <Message negative>
    <Message.Header>We&lsquo;ve encountered an error.</Message.Header>
    <p>{ children }</p>
  </Message>

ErrorMessage.propTypes = {
  children: PropTypes.element.isRequired
}

export default ErrorMessage
