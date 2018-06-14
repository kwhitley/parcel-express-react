import React from 'react'
import PropTypes from 'prop-types'
import List from './pages/List'
import Package from './pages/Package'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './Nav'
import { hot } from 'react-hot-loader';


const App = () => {
  return (
    <div>
      <h1>Parcel Test</h1>
      <Navigation />
      <Switch>
        <Route path="/list" component={List} />
        <Route path="/package" component={Package} />
        <Redirect from="/" exact to="/list" />
      </Switch>
    </div>
  )
}

export default hot(module)(App)
