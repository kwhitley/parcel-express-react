import React from 'react';
import { Grid } from 'semantic-ui-react';
import List from './List';
import { ListProvider } from './ListContext';
import { connect } from 'react-redux';
import list from '../state/list';
import { toJS } from './toJS';

const { addItem, removeItem } = list.actions;
console.log('addItem', addItem);
console.log('removeItem', removeItem);

export const Menu = ({ items, ...actions }) => {
  return (
    <List items={items} {...actions} />
  )
}

const mapStateToProps = state => ({
  items: list.selectors.namespaced.getItemsSorted(state)
});

export const ConnectedMenu = connect(mapStateToProps, {
  addItem,
  removeItem
})(toJS(Menu));

export default Menu;
