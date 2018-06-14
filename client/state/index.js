import { merge } from 'redux-automap'
import list from './list'
import api from './api'
import route from './route'

export default merge([ list, api, route ])
