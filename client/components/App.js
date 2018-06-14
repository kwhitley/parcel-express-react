import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedMenu } from './Menu'
import { ConnectedPackage } from './Package'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './Nav'


const App = ({ history, location }) => {
  return (
    <div>
      <h1>Parcel Test</h1>
      <Navigation />
      <Switch>
        <Route path="/list" component={ConnectedMenu} />
        <Route path="/package" component={ConnectedPackage} />
        <Redirect from="/" exact to="/list" />
      </Switch>
    </div>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
