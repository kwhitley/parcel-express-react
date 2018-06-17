import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { default as Navigation, routes } from './Nav'
import { hot } from 'react-hot-loader'

const App = () => {
  return (
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
                                />)
          }
          <Redirect from="/" exact to={routes.length && routes[0].path} />
        </Switch>
      </div>
    </div>
  )
}

export default hot(module)(App)
