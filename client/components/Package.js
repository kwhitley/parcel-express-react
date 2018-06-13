import React from 'react';
import { ListProvider } from './ListContext';
import { Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import api from '../state/api';
import { toJS } from './toJS';

const { loadPackageInfo, loadPackageInfoSuccess } = api.actions;

export const Package = ({ pkg, loadPackageInfo }) => {
  return (
    <div className="package-loader">
      <Header>Package</Header>
      <Button fluid disabled={pkg.isLoading} onClick={loadPackageInfo}>Load Package</Button>
    </div>
  )
}

const mapStateToProps = state => ({
  pkg: state.getIn(['api', 'package'])
});

export const ConnectedPackage = connect(mapStateToProps, {
  loadPackageInfo
})(toJS(Package));

export default Package;
