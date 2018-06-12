// automap(namespace, { actionReducers, initialState }) - returns individual mapped actions/reducers/etc
export const automap = function(config = {}) {
  const { namespace, actionReducers = [], initialState = {}, selectors = {} } = config;
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

  // remap selectors to namespace
  let namespacedSelectors = {}

  for (let selectorKey in selectors) {
    let selector = selectors[selectorKey];
    namespacedSelectors[selectorKey] = state => selector(state.get(namespace));
  }

  selectors.namespaced = namespacedSelectors;

  return Object.assign({}, config, { namespace, actions, reducers, selectors, reducer });
}

// merge([ map1, map2, ... ]) - maps reducers to their namespace for easy inclusion into store
export const merge = (maps = []) => maps.reduce((acc, map) => {
  let { namespace, reducer } = map;
  acc[namespace] = reducer;

  return acc;
}, {});


export default { automap };
