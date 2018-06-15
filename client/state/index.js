import { merge } from 'redux-automap'
import list from './list'
import api from './api'
import route from './route'
import dashboards from './dashboards'

console.log('dashboards', dashboards)

export default merge([ list, api, route, dashboards ])
