import React from 'react'
import { connect } from 'react-redux'
import { fromImmutable } from 'react-wrappers'
import List from './List'
import list from '../state/list'

const { addItem, removeItem, toggleIsActive } = list.actions

export const Menu = ({ items, ...actions }) => {
  return (
    <List items={items} {...actions} />
  )
}

const mapStateToProps = state => ({
  items: list.selectors.namespaced.getItems(state)
})

export const ConnectedMenu = connect(mapStateToProps, {
  addItem,
  removeItem,
  toggleIsActive
})(fromImmutable(Menu))

export default Menu
