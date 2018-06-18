import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromImmutable } from 'react-wrappers'
import { Divider, Table } from 'semantic-ui-react'
import Item from './Item'
import AddItem from './AddItem'
import list from '../../../state/list'

const List = ({ items = [], addItem, removeItem, toggleIsActive }) =>
  <React.Fragment>
    <AddItem addItem={addItem} />
    <Divider horizontal>{ items.length } Items</Divider>
    <Table compact celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Created</Table.HeaderCell>
          <Table.HeaderCell>Active</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          items.map(item => <Item
                              key={item.id}
                              item={item}
                              removeItem={() => removeItem(item.id)}
                              toggleIsActive={() => toggleIsActive(item.id)}
                            />
                    )
        }
      </Table.Body>
    </Table>
  </React.Fragment>

List.propTypes = {
  items: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  toggleIsActive: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  items: list.getItems(state)
})

export const ConnectedList = connect(mapStateToProps, list.actions)(fromImmutable(List))

export default List
