import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'semantic-ui-react'

class AddItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: 'foo' }
    this.update = this.update.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  update(e) {
    this.setState({
      value: e.target.value
    })
  }

  addItem() {
    let itemName = this.state.value || 'new item'
    this.props.addItem(itemName)
    this.setState({ value: '' })
  }

  render() {
    return (
      <Form onSubmit={this.addItem}>
        <Input
          fluid
          placeholder="New Item"
          action={{ labelPosition: 'right', icon: 'plus', content: 'Add Item' }}
          actionPosition='left'
          onChange={this.update}
          value={this.state.value}
          />
      </Form>
    )
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired
}

export default AddItem
