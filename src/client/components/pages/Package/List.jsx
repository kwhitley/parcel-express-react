import React from 'react'
import PropTypes from 'prop-types'
import { List, Statistic } from 'semantic-ui-react'

export const PackageList =({ name, libs }) =>
  <div>
    <Statistic horizontal color="green" label={name} value={libs.length} />
    <List>
      {
        libs && libs.map(lib => (
          <List.Item key={lib.name}><b>{ lib.name }</b>: { lib.version }</List.Item>
        ))
      }
    </List>
  </div>

export default PackageList

PackageList.propTypes = {
  name: PropTypes.string.isRequired,
  libs: PropTypes.array,
}
