import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fromImmutable } from 'react-wrappers'
import Dependencies from './Dependencies'
import ErrorMessage from '../../messages/ErrorMessage'
import api from '../../../state/api'

const Package = ({ pkg, deps, devDeps, timesLoaded, loadPackageInfo }) =>
  <div className="package-loader">
    <Button fluid disabled={pkg.isLoading} onClick={loadPackageInfo} loading={pkg.isLoading}>
      { deps && Object.keys(deps).length ? `Reload Package (loaded ${timesLoaded} times)` : 'Load Package' }
    </Button>
    { deps && <Dependencies deps={deps} devDeps={devDeps} /> }
    { pkg.error && <ErrorMessage>{ pkg.error }</ErrorMessage> }
  </div>

Package.propTypes = {
  pkg: PropTypes.object.isRequired,
  deps: PropTypes.array,
  devDeps: PropTypes.array,
  timesLoaded: PropTypes.number.isRequired,
  loadPackageInfo: PropTypes.func.isRequired,
}

Package.defaultProps = {
  deps: [],
  devDeps: []
}

const mapStateToProps = state => ({
  pkg: api.getPackage(state),
  deps: api.getDependenciesAsArray(state),
  devDeps: api.getDevDependenciesAsArray(state),
  timesLoaded: api.getTimesLoaded(state),
})

export const ConnectedPackage = connect(mapStateToProps, {
  loadPackageInfo: api.actions.loadPackageInfo
})(fromImmutable(Package))

export default Package
