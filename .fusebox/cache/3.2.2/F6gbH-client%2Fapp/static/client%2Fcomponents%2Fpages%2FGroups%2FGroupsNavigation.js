module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = require('babel-runtime/helpers/createClass');\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = require('babel-runtime/helpers/inherits');\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar GroupsNavigation = function (_React$Component) {\n  (0, _inherits3.default)(GroupsNavigation, _React$Component);\n\n  function GroupsNavigation(props) {\n    (0, _classCallCheck3.default)(this, GroupsNavigation);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupsNavigation.__proto__ || (0, _getPrototypeOf2.default)(GroupsNavigation)).call(this, props));\n\n    _this.state = {};\n    return _this;\n  }\n\n  (0, _createClass3.default)(GroupsNavigation, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        null,\n        'Groups'\n      );\n    }\n  }, {\n    key: '__reactstandin__regenerateByEval',\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n  return GroupsNavigation;\n}(_react2.default.Component);\n\nvar _default = GroupsNavigation;\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(GroupsNavigation, 'GroupsNavigation', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["babel-runtime/core-js/object/get-prototype-of","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/createClass","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: "{\"version\":3,\"sources\":[\"/client/components/pages/Groups/GroupsNavigation.js\"],\"names\":[\"GroupsNavigation\",\"props\",\"state\",\"React\",\"Component\"],\"mappings\":\";;;;;;;;;;;;;;;;;;;;;;;;;;AAAA;;;;;;;;;;;;IAEMA,gB;;;AACJ,4BAAYC,KAAZ,EAAkB;AAAA;;AAAA,0JACVA,KADU;;AAAA,UAIlBC,KAJkB,GAIV,EAJU;AAAA;AAEjB;;;;6BAIQ;AACP,aACE;AAAA;AAAA;AAAA;AAAA,OADF;AAGD;;;;;;;;;;EAX4BC,gBAAMC,S;;eActBJ,gB;;;;;;;;;;;;;0BAdTA,gB\",\"file\":\"client/components/pages/Groups/GroupsNavigation.js\",\"sourcesContent\":[\"import React from 'react'\\n\\nclass GroupsNavigation extends React.Component {\\n  constructor(props){\\n    super(props)\\n  }\\n\\n  state = {}\\n\\n  render() {\\n    return (\\n      <div>Groups</div>\\n    )\\n  }\\n}\\n\\nexport default GroupsNavigation\\n\"]}",
headerContent: undefined,
mtime: 1529073031252,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
