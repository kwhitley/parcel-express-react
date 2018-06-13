import React from 'react';
import { Grid } from 'semantic-ui-react';
import List from './List';
import { ListProvider } from './ListContext';
import { connect } from 'react-redux';
import list from '../state/list';
import { toJS } from './toJS';

const { addItem, removeItem, toggleIsActive } = list.actions;

export const Menu = ({ items, ...actions }) => {
  return (
    <List items={items} {...actions} />
  )
}

const mapStateToProps = state => ({
  items: list.selectors.namespaced.getItems(state)
});

export const ConnectedMenu = connect(mapStateToProps, {
  addItem,
  removeItem,
  toggleIsActive
})(toJS(Menu));

export default Menu;
