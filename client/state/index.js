import { merge } from 'redux-automap'
import list from './list'
import api from './api'

export default merge([ list, api ])
