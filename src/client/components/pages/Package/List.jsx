import React from 'react'
import PropTypes from 'prop-types'
import { List, Statistic } from 'semantic-ui-react'

const PackageList =({ name, libs = [] }) =>
  <div>
    <Statistic horizontal color="green" label={name} value={libs.length} />
    <List>
      {
        libs.map(lib => (
          <List.Item key={lib.name}><b>{ lib.name }</b>: { lib.version }</List.Item>
        ))
      }
    </List>
  </div>

PackageList.propTypes = {
  name: PropTypes.string.isRequired,
  libs: PropTypes.array,
}

PackageList.defaultProps = {
  libs: [],
}

export default PackageList
