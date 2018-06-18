import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ message, children }) =>
  <Message negative>
    <Message.Header>We&lsquo;ve encountered an error.</Message.Header>
    <p>{ message || children }</p>
  </Message>

ErrorMessage.propTypes = {
  message: PropTypes.string,
  children: PropTypes.element
}

ErrorMessage.defaultProps = {
  message: undefined,
  children: undefined
}

export default ErrorMessage
