module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.actionReducers = exports.initialState = exports.namespace = undefined;\n\nvar _reduxAutomap = require('redux-automap');\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar namespace = exports.namespace = 'route';\n\n// initial state for reducer\nvar initialState = exports.initialState = '/';\n\n// define all action/reducer pairs here... add \"type\" attributes for\nvar actionReducers = exports.actionReducers = [{\n  change: function change(path) {\n    return { type: 'route/CHANGE', path: path };\n  },\n  reducer: function reducer(state, action) {\n    return action.path;\n  }\n}];\n\nvar _default = (0, _reduxAutomap.automap)({ namespace: namespace, actionReducers: actionReducers, initialState: initialState });\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(namespace, 'namespace', 'unknown');\n  reactHotLoader.register(initialState, 'initialState', 'unknown');\n  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["redux-automap","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1528992091234,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
