import React from 'react'
import { Header, Button, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fromImmutable } from 'react-wrappers'
import Dependencies from './Dependencies'
import ErrorMessage from '../../messages/ErrorMessage'
import api from '../../../state/api'

const { loadPackageInfo, loadPackageInfoSuccess } = api.actions

export const Package = ({ pkg, deps, devDeps, timesLoaded, loadPackageInfo }) =>
  <div className="package-loader">
    <Header>Package</Header>
    <Button fluid disabled={pkg.isLoading} onClick={loadPackageInfo} loading={pkg.isLoading}>
      { deps && Object.keys(deps).length ? `Reload Package (loaded ${timesLoaded} times)` : 'Load Package' }
    </Button>
    { deps && <Dependencies deps={deps} devDeps={devDeps} /> }
    { pkg.error && <ErrorMessage>{ pkg.error }</ErrorMessage> }
  </div>

const mapStateToProps = state => ({
  pkg: api.getPackage(state),
  deps: api.getDependenciesAsArray(state),
  devDeps: api.getDevDependenciesAsArray(state),
  timesLoaded: api.getTimesLoaded(state),
})

export default connect(mapStateToProps, {
  loadPackageInfo
})(fromImmutable(Package))
