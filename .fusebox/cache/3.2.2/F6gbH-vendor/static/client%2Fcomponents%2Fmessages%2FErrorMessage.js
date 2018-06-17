module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _semanticUiReact = require('semantic-ui-react');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default(_ref) {\n  var children = _ref.children;\n  return _react2.default.createElement(\n    _semanticUiReact.Message,\n    { negative: true },\n    _react2.default.createElement(\n      _semanticUiReact.Message.Header,\n      null,\n      'We\\'ve encountered an error.'\n    ),\n    _react2.default.createElement(\n      'p',\n      null,\n      children\n    )\n  );\n};\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["react","semantic-ui-react","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1528991143051,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
