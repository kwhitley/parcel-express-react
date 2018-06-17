module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.GroupedTag = exports.Tag = exports.Group = undefined;\n\nvar _immutable = require('immutable');\n\n(function () {\n  var enterModule = require('react-hot-loader').enterModule;\n\n  enterModule && enterModule(module);\n})();\n\n// initial state for reducer\nvar Group = exports.Group = new _immutable.Record({\n  id: undefined,\n  path: ['Assets', 'Region 1', 'Pumps'],\n  name: 'New Group',\n  parent: undefined,\n  tags: new _immutable.List()\n});\n\n// initial state for reducer\nvar Tag = exports.Tag = new _immutable.Record({\n  id: undefined,\n  name: 'New Tag'\n});\n\nvar GroupedTag = exports.GroupedTag = new _immutable.Record({\n  id: undefined,\n  name: 'New Grouped Tag'\n});\n\n// initial state for reducer\nvar _default = {\n  Group: Group, Tag: Tag, GroupedTag: GroupedTag\n};\nexports.default = _default;\n;\n\n(function () {\n  var reactHotLoader = require('react-hot-loader').default;\n\n  var leaveModule = require('react-hot-loader').leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Group, 'Group', 'unknown');\n  reactHotLoader.register(Tag, 'Tag', 'unknown');\n  reactHotLoader.register(GroupedTag, 'GroupedTag', 'unknown');\n  reactHotLoader.register(_default, 'default', 'unknown');\n  leaveModule(module);\n})();\n\n;",
dependencies: ["immutable","react-hot-loader","react-hot-loader","react-hot-loader"],
sourceMap: {},
headerContent: undefined,
mtime: 1529084768784,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
