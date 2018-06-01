import React from 'react';
import { Grid } from 'semantic-ui-react';
import List from './List';
import { ListProvider } from './ListContext';
import { connect } from 'react-redux';
import { selectors } from '../state/list';

export const Menu = ({ items }) =>
  <List items={items} />

const mapStateToProps = state => ({
  items: selectors.getHalfItemsSorted(state)
});

export const ConnectedMenu = connect(mapStateToProps)(Menu);

export default Menu;
