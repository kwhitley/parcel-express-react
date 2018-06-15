import { automap } from 'redux-automap'

export const namespace = 'route'

// initial state for reducer
export const initialState = '/'

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    change: (path) => ({ type: 'route/CHANGE', path }),
    reducer: (state, action) => action.path
  }
]

export default automap({ namespace, actionReducers, initialState })
