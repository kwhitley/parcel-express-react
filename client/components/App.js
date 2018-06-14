import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedMenu } from './Menu';
import { ConnectedPackage } from './Package';


const App = ({ history, location }) => {
  return (
    <div>
      <h1>Parcel Test</h1>
      <ConnectedMenu />
      <ConnectedPackage />
    </div>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
