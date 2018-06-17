module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.actionReducers = exports.initialState = exports.selectors = exports.namespace = undefined;\n\nvar _immutable = require('immutable');\n\nvar _reduxAutomap = require('redux-automap');\n\nvar _reselect = require('reselect');\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar namespace = exports.namespace = 'list';\n\nvar getItems = function getItems(state) {\n  return state.get('items');\n};\nvar getNumItems = function getNumItems(state) {\n  return state.get('items').size;\n};\nvar getHalfItems = function getHalfItems(items, number) {\n  return items.slice(0, Math.floor(number / 2));\n};\n\nvar getItemsSorted = (0, _reselect.createSelector)([getItems], function (items) {\n  return items.sort(function (a, b) {\n    a = a.get('name');\n    b = b.get('name');\n\n    return a < b ? -1 : a > b ? 1 : 0;\n  }).reverse();\n});\n\nvar getHalfItemsUnsorted = (0, _reselect.createSelector)([getItems, getNumItems], getHalfItems);\n\nvar getHalfItemsSorted = (0, _reselect.createSelector)([getItemsSorted, getNumItems], getHalfItems);\n\nvar selectors = exports.selectors = {\n  getItems: getItems, getNumItems: getNumItems, getItemsSorted: getItemsSorted, getHalfItemsUnsorted: getHalfItemsUnsorted, getHalfItemsSorted: getHalfItemsSorted\n};\n\nvar Entry = new _immutable.Record({\n  id: undefined,\n  name: 'new item',\n  date: new Date(),\n  isActive: false\n});\n\n// initial state for reducer\nvar initialState = exports.initialState = (0, _immutable.fromJS)({\n  items: [{ id: 1, name: 'foo', date: new Date(), isActive: true }, { id: 2, name: 'bar', date: new Date(), isActive: true }, { id: 3, name: 'baz', date: new Date(), isActive: true }, { id: 4, name: 'cat', date: new Date(), isActive: false }, { id: 5, name: 'miffles', date: new Date(), isActive: false }, { id: 6, name: 'vlad', date: new Date(), isActive: true }, { id: 7, name: 'baxter', date: new Date(), isActive: true }]\n});\n\n// define all action/reducer pairs here... add \"type\" attributes for\nvar actionReducers = exports.actionReducers = [{\n  addItem: function addItem() {\n    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new item';\n    return { type: 'list/ADD_ITEM', name: name };\n  },\n  reducer: function reducer(state, action) {\n    var nextID = state.get('items').maxBy(function (i) {\n      return i.get('id');\n    }).get('id') + 1;\n\n    return state.update('items', function (items) {\n      return items.push(new Entry({\n        id: nextID,\n        name: action.name,\n        date: new Date()\n      }));\n    });\n  }\n}, {\n  toggleIsActive: function toggleIsActive(id) {\n    return { type: 'list/TOGGLE_ITEM_IS_ACTIVE', id: id };\n  },\n  reducer: function reducer(state, action) {\n    return state.update('items', function (items) {\n      return items.map(function (item) {\n        return item.get('id') === action.id ? item.update('isActive', function (active) {\n          return !active;\n        }) : item;\n      });\n    });\n  }\n}, {\n  // type: constants.REMOVE_ITEM,\n  removeItem: function removeItem(id) {\n    return { type: 'list/REMOVE_ITEM', id: id };\n  },\n  reducer: function reducer(state, action) {\n    return state.update('items', function (items) {\n      return items.filter(function (i) {\n        return i.get('id') !== action.id;\n      });\n    });\n  }\n}];\n\nvar _default = (0, _reduxAutomap.automap)({ namespace: namespace, actionReducers: actionReducers, initialState: initialState, selectors: selectors, foo: 'bar' });\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(namespace, 'namespace', 'unknown');\n  reactHotLoader.register(getItems, 'getItems', 'unknown');\n  reactHotLoader.register(getNumItems, 'getNumItems', 'unknown');\n  reactHotLoader.register(getHalfItems, 'getHalfItems', 'unknown');\n  reactHotLoader.register(getItemsSorted, 'getItemsSorted', 'unknown');\n  reactHotLoader.register(getHalfItemsUnsorted, 'getHalfItemsUnsorted', 'unknown');\n  reactHotLoader.register(getHalfItemsSorted, 'getHalfItemsSorted', 'unknown');\n  reactHotLoader.register(selectors, 'selectors', 'unknown');\n  reactHotLoader.register(Entry, 'Entry', 'unknown');\n  reactHotLoader.register(initialState, 'initialState', 'unknown');\n  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["immutable","redux-automap","reselect","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1528991092851,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
