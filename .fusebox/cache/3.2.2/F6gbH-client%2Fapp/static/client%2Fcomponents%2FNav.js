module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.routes = undefined;\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _semanticUiReact = require('semantic-ui-react');\n\nvar _reactRouterDom = require('react-router-dom');\n\nvar _List = require('./pages/List');\n\nvar _List2 = _interopRequireDefault(_List);\n\nvar _Package = require('./pages/Package');\n\nvar _Package2 = _interopRequireDefault(_Package);\n\nvar _Groups = require('./pages/Groups');\n\nvar _Groups2 = _interopRequireDefault(_Groups);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\n// pages\n\n\nvar routes = exports.routes = [{ path: '/list', name: 'List', component: _List2.default }, { path: '/package', name: 'Package', component: _Package2.default }, { path: '/groups', name: 'Groups Demo', component: _Groups2.default }];\n\nvar _default = function _default() {\n  return _react2.default.createElement(\n    _semanticUiReact.Menu,\n    { pointing: true, secondary: true, className: 'navigation' },\n    routes.map(function (route) {\n      return _react2.default.createElement(_semanticUiReact.Menu.Item, {\n        key: route.path,\n        to: route.path,\n        name: route.name,\n        as: _reactRouterDom.NavLink\n      });\n    })\n  );\n};\n\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(routes, 'routes', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["react","semantic-ui-react","react-router-dom","./pages/List","./pages/Package","./pages/Groups","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: "{\"version\":3,\"sources\":[\"/client/components/Nav.js\"],\"names\":[\"routes\",\"path\",\"name\",\"component\",\"List\",\"Package\",\"Groups\",\"map\",\"route\",\"NavLink\"],\"mappings\":\";;;;;;;AAAA;;;;AACA;;AACA;;AAGA;;;;AACA;;;;AACA;;;;;;;;;;;;AAHA;;;AAKO,IAAMA,0BAAS,CACpB,EAAEC,MAAM,OAAR,EAAiBC,MAAM,MAAvB,EAA+BC,WAAWC,cAA1C,EADoB,EAEpB,EAAEH,MAAM,UAAR,EAAoBC,MAAM,SAA1B,EAAqCC,WAAWE,iBAAhD,EAFoB,EAGpB,EAAEJ,MAAM,SAAR,EAAmBC,MAAM,aAAzB,EAAwCC,WAAWG,gBAAnD,EAHoB,CAAf;;eAMQ;AAAA,SACb;AAAC,yBAAD;AAAA,MAAM,cAAN,EAAe,eAAf,EAAyB,WAAU,YAAnC;AAEIN,WAAOO,GAAP,CAAW;AAAA,aAAS,8BAAC,qBAAD,CAAM,IAAN;AACE,aAAKC,MAAMP,IADb;AAEE,YAAIO,MAAMP,IAFZ;AAGE,cAAMO,MAAMN,IAHd;AAIE,YAAIO;AAJN,QAAT;AAAA,KAAX;AAFJ,GADa;AAAA,C;;;;;;;;;;;;;;0BANFT,M\",\"file\":\"client/components/Nav.js\",\"sourcesContent\":[\"import React from 'react'\\nimport { Menu } from 'semantic-ui-react'\\nimport { NavLink } from 'react-router-dom'\\n\\n// pages\\nimport List from './pages/List'\\nimport Package from './pages/Package'\\nimport Groups from './pages/Groups'\\n\\nexport const routes = [\\n  { path: '/list', name: 'List', component: List },\\n  { path: '/package', name: 'Package', component: Package },\\n  { path: '/groups', name: 'Groups Demo', component: Groups },\\n]\\n\\nexport default () =>\\n  <Menu pointing secondary className=\\\"navigation\\\">\\n    {\\n      routes.map(route => <Menu.Item\\n                            key={route.path}\\n                            to={route.path}\\n                            name={route.name}\\n                            as={NavLink}\\n                          />)\\n    }\\n  </Menu>\\n\"]}",
headerContent: undefined,
mtime: 1529078079304,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}