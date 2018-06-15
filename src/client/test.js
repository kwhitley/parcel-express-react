import React from 'react'
import ReactDom from 'react-dom'
import './styles/base.scss'
import './styles/base.less'

import Example from './test2.js'

const Header = ({ name }) => <h1>{ name }</h1>

ReactDom.render(
  <div>
    <Header name="Fuse Box Test" />
    <Example />
  </div>,
  document.getElementById('app')
)
