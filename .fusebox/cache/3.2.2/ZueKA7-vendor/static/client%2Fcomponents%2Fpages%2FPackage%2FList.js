module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _semanticUiReact = require('semantic-ui-react');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default(_ref) {\n  var name = _ref.name,\n      libs = _ref.libs;\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_semanticUiReact.Statistic, { horizontal: true, color: 'green', label: name, value: libs.length }),\n    _react2.default.createElement(\n      _semanticUiReact.List,\n      null,\n      libs && libs.map(function (lib) {\n        return _react2.default.createElement(\n          _semanticUiReact.List.Item,\n          { key: lib.name },\n          _react2.default.createElement(\n            'b',\n            null,\n            lib.name\n          ),\n          ': ',\n          lib.version\n        );\n      })\n    )\n  );\n};\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["react","semantic-ui-react","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1529019527288,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
