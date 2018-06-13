import React from 'react';
import { ListProvider } from './ListContext';
import { Header, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import api from '../state/api';
import { toJS } from './toJS';
import Dependencies from './Dependencies';
import ErrorMessage from './ErrorMessage';

const { loadPackageInfo, loadPackageInfoSuccess } = api.actions;

export const Package = ({ pkg, deps, timesLoaded, loadPackageInfo }) => {
  console.log('pkg', pkg)
  return (
    <div className="package-loader">
      <Header>Package</Header>
      <Button fluid disabled={pkg.isLoading} onClick={loadPackageInfo} loading={pkg.isLoading}>
        { deps && Object.keys(deps).length ? `Reload Package (loaded ${timesLoaded} times)` : 'Load Package' }
      </Button>
      { deps && Object.keys(deps).length && <Dependencies deps={deps} /> }
      { pkg.error && <ErrorMessage>{ pkg.error }</ErrorMessage> }
    </div>
  )
}

const mapStateToProps = state => ({
  pkg: api.selectors.namespaced.getPackage(state),
  deps: api.selectors.namespaced.getDependencies(state),
  devDeps: api.selectors.namespaced.getDevDependencies(state),
  timesLoaded: api.selectors.namespaced.getTimesLoaded(state),
});

export const ConnectedPackage = connect(mapStateToProps, {
  loadPackageInfo
})(toJS(Package));

export default Package;
