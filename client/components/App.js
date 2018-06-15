import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { default as Navigation, routes } from './Nav'
import { hot } from 'react-hot-loader'

const App = () => {
  return (
    <div>
      <h1>Parcel Test</h1>
      <Navigation />
      <Switch>
        {
          routes.map(route => <Route
                                key={route.path}
                                path={route.path}
                                component={route.component}
                              />)
        }
        <Redirect from="/" exact to={routes.length && routes[0].path} />
      </Switch>
    </div>
  )
}

export default hot(module)(App)
