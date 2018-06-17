import React from 'react'
import { Input, Form } from 'semantic-ui-react'

class AddItem extends React.Component {
  state = {
    value: 'foo'
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
      <Form onSubmit={::this.addItem}>
        <Input
          fluid
          placeholder="New Item"
          action={{ labelPosition: 'right', icon: 'plus', content: 'Add Item' }}
          actionPosition='left'
          onChange={::this.update}
          value={this.state.value}
          />
      </Form>
    )
  }
}

export default AddItem
