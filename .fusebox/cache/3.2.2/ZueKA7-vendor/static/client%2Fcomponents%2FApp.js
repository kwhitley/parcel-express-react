module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = require('prop-types');\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRouterDom = require('react-router-dom');\n\nvar _Nav = require('./Nav');\n\nvar _Nav2 = _interopRequireDefault(_Nav);\n\nvar _reactHotLoader = require('react-hot-loader');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar App = function App() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'h1',\n      null,\n      'Parcel Tester'\n    ),\n    _react2.default.createElement(_Nav2.default, null),\n    _react2.default.createElement(\n      'div',\n      { className: 'page-content' },\n      _react2.default.createElement(\n        _reactRouterDom.Switch,\n        null,\n        _Nav.routes.map(function (route) {\n          return _react2.default.createElement(_reactRouterDom.Route, {\n            key: route.path,\n            path: route.path,\n            component: route.component\n          });\n        }),\n        _react2.default.createElement(_reactRouterDom.Redirect, { from: '/', exact: true, to: _Nav.routes.length && _Nav.routes[0].path })\n      )\n    )\n  );\n};\n\nvar _default = (0, _reactHotLoader.hot)(module)(App);\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(App, 'App', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["react","prop-types","react-router-dom","./Nav","react-hot-loader","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1529199027122,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
