import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default () =>
  <Menu pointing secondary className="navigation">
    <Menu.Item name='List' as={NavLink} to='/list'></Menu.Item>
    <Menu.Item name='Package' as={NavLink} to='/package'></Menu.Item>
  </Menu>
