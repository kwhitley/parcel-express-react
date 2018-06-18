import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Navigation, { routes } from './Nav'

const App = () =>
  <div>
    <h1>Parcel Tester</h1>
    <Navigation />
    <div className="page-content">
      <Switch>
        {
          routes.map(route => <Route
                                key={route.path}
                                path={route.path}
                                component={route.component}
                              />
          )
        }
        <Redirect from="/" exact to={routes.length && routes[0].path} />
      </Switch>
    </div>
  </div>

export default hot(module)(App)
