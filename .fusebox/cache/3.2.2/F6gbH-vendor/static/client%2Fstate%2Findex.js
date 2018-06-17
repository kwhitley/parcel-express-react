module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _reduxAutomap = require('redux-automap');\n\nvar _list = require('./list');\n\nvar _list2 = _interopRequireDefault(_list);\n\nvar _api = require('./api');\n\nvar _api2 = _interopRequireDefault(_api);\n\nvar _route = require('./route');\n\nvar _route2 = _interopRequireDefault(_route);\n\nvar _dashboards = require('./dashboards');\n\nvar _dashboards2 = _interopRequireDefault(_dashboards);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nconsole.log('dashboards', _dashboards2.default);\n\nvar _default = (0, _reduxAutomap.merge)([_list2.default, _api2.default, _route2.default, _dashboards2.default]);\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["redux-automap","./list","./api","./route","./dashboards","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1529086515736,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
