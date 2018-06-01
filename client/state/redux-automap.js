export const automap = function(namespace, { actionReducers = [], initialState = {}, constants = {}}) {
  const findKey = (item) => (finder) => Object.keys(item).find(finder);
  const findAction = (key) => key !== 'reducer' && key !== 'type';

  const actions = actionReducers.reduce((acc, item) => {
    let actionKey = findKey(item)(findAction);

    acc[actionKey] = item[actionKey];

    return acc;
  }, {});

  const reducers = actionReducers.reduce((acc, item) => {
    let actionKey = findKey(item)(findAction);
    let reducerKey = item.type;

    if (!reducerKey) {
      // try to pull name from action
      let action = item[actionKey];
      let actionResult = typeof action === 'function' && item[actionKey]() || {};
      reducerKey = typeof actionResult === 'object' && actionResult.type;
    }

    acc[reducerKey] = item.reducer;

    return acc;
  }, {});

  const reducer = (state = initialState, action) => {
    let actionReducer = reducers[action.type];
    return actionReducer && actionReducer(state, action) || state;
  };

  return { namespace, actions, reducers, reducer, constants };
}

export default automap;
