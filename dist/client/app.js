(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("client/index.js", function(exports, require, module, __filename, __dirname){

'use strict';

require('semantic-ui-css/semantic.min.css');

require('antd/dist/antd.min.css');

require('./styles/base.scss');

require('./styles/base.less');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxImmutable = require('redux-immutable');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _api = require('./state/api');

var _api2 = _interopRequireDefault(_api);

var _route = require('./state/route');

var _route2 = _interopRequireDefault(_route);

var _dashboards = require('./state/dashboards');

var _dashboards2 = _interopRequireDefault(_dashboards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

// history


var history = (0, _createBrowserHistory2.default)();

var sagaMiddleware = (0, _reduxSaga2.default)();
var rootReducer = (0, _reduxImmutable.combineReducers)(_state2.default);
var store = (0, _redux.createStore)(rootReducer, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// history binding... messy, abstract elsewhere or turn into module
history.listen(function (location, action) {
  var path = '' + location.pathname + location.search + location.hash;
  store.dispatch(_route2.default.actions.change(path));
});

store.dispatch(_dashboards2.default.addGroup('Newish Group', 1));
store.dispatch(_dashboards2.default.addTagToGroup(6, 2));

var path = '' + location.pathname + location.search + location.hash;
store.dispatch(_route2.default.actions.change(path));

// register sagas
sagaMiddleware.run(_api2.default.sagas.watcherSaga);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(_App2.default, null)
  )
), document.getElementById('app'));
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(history, 'history', 'unknown');
  reactHotLoader.register(sagaMiddleware, 'sagaMiddleware', 'unknown');
  reactHotLoader.register(rootReducer, 'rootReducer', 'unknown');
  reactHotLoader.register(store, 'store', 'unknown');
  reactHotLoader.register(path, 'path', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/styles/base.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("client/styles/base.scss", "body {\n  color: #222;\n  font-family: sans-serif;\n  font-weight: lighter;\n  height: 100%;\n  width: 100%;\n  position: relative; }\n  body:before {\n    content: '';\n    z-index: -1;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    opacity: 0.2; }\n  body #app {\n    padding: 1em 2em; }\n\n.navigation:hover .item {\n  border-bottom-color: transparent !important; }\n\n.navigation .item {\n  transition: all 0.3s ease !important; }\n  .navigation .item:hover {\n    border-color: #1b1c1d !important; }\n\n.cards > .card {\n  box-shadow: none !important; }\n\n.page-content {\n  padding-top: 1em; }\n\nul {\n  list-style-type: none;\n  padding: 0; }\n\nli {\n  margin-bottom: 0.5em; }\n\n.pages {\n  position: relative; }\n  .pages > * {\n    position: absolute;\n    width: 100%; }\n\n.padded {\n  padding: 1em; }\n\n/*# sourceMappingURL=base.scss.map */")
});
___scope___.file("client/styles/base.less", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("client/styles/base.less", "body {\n  color: red !important;\n}\n")
});
___scope___.file("client/state/index.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxAutomap = require('redux-automap');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _dashboards = require('./dashboards');

var _dashboards2 = _interopRequireDefault(_dashboards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

console.log('dashboards', _dashboards2.default);

var _default = (0, _reduxAutomap.merge)([_list2.default, _api2.default, _route2.default, _dashboards2.default]);

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/state/list.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionReducers = exports.initialState = exports.selectors = exports.namespace = undefined;

var _immutable = require('immutable');

var _reduxAutomap = require('redux-automap');

var _reselect = require('reselect');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var namespace = exports.namespace = 'list';

var getItems = function getItems(state) {
  return state.get('items');
};
var getNumItems = function getNumItems(state) {
  return state.get('items').size;
};
var getHalfItems = function getHalfItems(items, number) {
  return items.slice(0, Math.floor(number / 2));
};

var getItemsSorted = (0, _reselect.createSelector)([getItems], function (items) {
  return items.sort(function (a, b) {
    a = a.get('name');
    b = b.get('name');

    return a < b ? -1 : a > b ? 1 : 0;
  }).reverse();
});

var getHalfItemsUnsorted = (0, _reselect.createSelector)([getItems, getNumItems], getHalfItems);

var getHalfItemsSorted = (0, _reselect.createSelector)([getItemsSorted, getNumItems], getHalfItems);

var selectors = exports.selectors = {
  getItems: getItems, getNumItems: getNumItems, getItemsSorted: getItemsSorted, getHalfItemsUnsorted: getHalfItemsUnsorted, getHalfItemsSorted: getHalfItemsSorted
};

var Entry = new _immutable.Record({
  id: undefined,
  name: 'new item',
  date: new Date(),
  isActive: false
});

// initial state for reducer
var initialState = exports.initialState = (0, _immutable.fromJS)({
  items: [{ id: 1, name: 'foo', date: new Date(), isActive: true }, { id: 2, name: 'bar', date: new Date(), isActive: true }, { id: 3, name: 'baz', date: new Date(), isActive: true }, { id: 4, name: 'cat', date: new Date(), isActive: false }, { id: 5, name: 'miffles', date: new Date(), isActive: false }, { id: 6, name: 'vlad', date: new Date(), isActive: true }, { id: 7, name: 'baxter', date: new Date(), isActive: true }]
});

// define all action/reducer pairs here... add "type" attributes for
var actionReducers = exports.actionReducers = [{
  addItem: function addItem() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new item';
    return { type: 'list/ADD_ITEM', name: name };
  },
  reducer: function reducer(state, action) {
    var nextID = state.get('items').maxBy(function (i) {
      return i.get('id');
    }).get('id') + 1;

    return state.update('items', function (items) {
      return items.push(new Entry({
        id: nextID,
        name: action.name,
        date: new Date()
      }));
    });
  }
}, {
  toggleIsActive: function toggleIsActive(id) {
    return { type: 'list/TOGGLE_ITEM_IS_ACTIVE', id: id };
  },
  reducer: function reducer(state, action) {
    return state.update('items', function (items) {
      return items.map(function (item) {
        return item.get('id') === action.id ? item.update('isActive', function (active) {
          return !active;
        }) : item;
      });
    });
  }
}, {
  // type: constants.REMOVE_ITEM,
  removeItem: function removeItem(id) {
    return { type: 'list/REMOVE_ITEM', id: id };
  },
  reducer: function reducer(state, action) {
    return state.update('items', function (items) {
      return items.filter(function (i) {
        return i.get('id') !== action.id;
      });
    });
  }
}];

var _default = (0, _reduxAutomap.automap)({ namespace: namespace, actionReducers: actionReducers, initialState: initialState, selectors: selectors, foo: 'bar' });

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(namespace, 'namespace', 'unknown');
  reactHotLoader.register(getItems, 'getItems', 'unknown');
  reactHotLoader.register(getNumItems, 'getNumItems', 'unknown');
  reactHotLoader.register(getHalfItems, 'getHalfItems', 'unknown');
  reactHotLoader.register(getItemsSorted, 'getItemsSorted', 'unknown');
  reactHotLoader.register(getHalfItemsUnsorted, 'getHalfItemsUnsorted', 'unknown');
  reactHotLoader.register(getHalfItemsSorted, 'getHalfItemsSorted', 'unknown');
  reactHotLoader.register(selectors, 'selectors', 'unknown');
  reactHotLoader.register(Entry, 'Entry', 'unknown');
  reactHotLoader.register(initialState, 'initialState', 'unknown');
  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/state/api.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionReducers = exports.initialState = exports.namespace = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _immutable = require('immutable');

var _reduxAutomap = require('redux-automap');

var _reselect = require('reselect');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _effects = require("redux-saga/lib/effects.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _marked = /*#__PURE__*/_regenerator2.default.mark(watcherSaga),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(fetchPackageInfo);

var namespace = exports.namespace = 'api';

var byName = function byName(a, b) {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};
var toDepsArray = function toDepsArray(deps) {
  return deps && (0, _entries2.default)(deps.toJS()).map(function (i) {
    return { name: i[0], version: i[1] };
  }).sort(byName);
};

var getPackage = function getPackage(state) {
  return state.getIn(['package']);
};
var getTimesLoaded = function getTimesLoaded(state) {
  return state.get('timesLoaded');
};
var getDependencies = function getDependencies(state) {
  return state.getIn(['package', 'data', 'dependencies']);
};
var getDevDependencies = function getDevDependencies(state) {
  return state.getIn(['package', 'data', 'devDependencies']);
};
var getDependenciesAsArray = (0, _reselect.createSelector)([getDependencies], toDepsArray);
var getDevDependenciesAsArray = (0, _reselect.createSelector)([getDevDependencies], toDepsArray);

var selectors = {
  getPackage: getPackage,
  getTimesLoaded: getTimesLoaded,
  getDependencies: getDependencies,
  getDevDependencies: getDevDependencies,
  getDependenciesAsArray: getDependenciesAsArray,
  getDevDependenciesAsArray: getDevDependenciesAsArray
};

var Resource = (0, _immutable.Record)({
  isLoading: false,
  success: undefined,
  error: undefined,
  data: undefined
});

// initial state for reducer
var initialState = exports.initialState = (0, _immutable.fromJS)({
  package: new Resource(),
  timesLoaded: 0
});

// watcher saga: watches for actions dispatched to the store, starts worker saga
function watcherSaga() {
  return _regenerator2.default.wrap(function watcherSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeLatest)('api/LOAD_PACKAGE_INFO', fetchPackageInfo);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function fetchPackageInfo() {
  var data;
  return _regenerator2.default.wrap(function fetchPackageInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('fetchPackageInfo saga triggered');
          _context2.prev = 1;
          _context2.next = 4;
          return (0, _effects.call)(function () {
            return _axios2.default.get('/package.json').then(function (r) {
              return (0, _immutable.fromJS)(r.data);
            });
          });

        case 4:
          data = _context2.sent;
          _context2.next = 7;
          return (0, _effects.put)({ type: "api/LOAD_PACKAGE_INFO_SUCCESS", data: data });

        case 7:
          _context2.next = 14;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2['catch'](1);

          console.log('error', _context2.t0);
          _context2.next = 14;
          return (0, _effects.put)({ type: "api/LOAD_PACKAGE_INFO_ERROR", error: _context2.t0.message });

        case 14:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 9]]);
}

var sagas = {
  watcherSaga: watcherSaga,
  fetchPackageInfo: fetchPackageInfo

  // define all action/reducer pairs here... add "type" attributes for
};var actionReducers = exports.actionReducers = [{
  loadPackageInfo: function loadPackageInfo() {
    return { type: 'api/LOAD_PACKAGE_INFO' };
  },
  reducer: function reducer(state) {
    return state.set('package', new Resource({ isLoading: true, data: state.getIn(['package', 'data']) }));
  }
}, {
  loadPackageInfoSuccess: function loadPackageInfoSuccess(data) {
    return { type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data: data };
  },
  reducer: function reducer(state, action) {
    return state.set('package', new Resource({ isLoading: false, success: true, data: action.data })).update('timesLoaded', function (count) {
      return count + 1;
    });
  }
}, {
  loadPackageInfoError: function loadPackageInfoError(error) {
    return { type: 'api/LOAD_PACKAGE_INFO_ERROR', error: error };
  },
  reducer: function reducer(state, action) {
    return state.set('package', new Resource({ error: action.error, success: false }));
  }
}];

var _default = (0, _reduxAutomap.automap)({ sagas: sagas, namespace: namespace, actionReducers: actionReducers, initialState: initialState, selectors: selectors });

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(namespace, 'namespace', 'unknown');
  reactHotLoader.register(byName, 'byName', 'unknown');
  reactHotLoader.register(toDepsArray, 'toDepsArray', 'unknown');
  reactHotLoader.register(getPackage, 'getPackage', 'unknown');
  reactHotLoader.register(getTimesLoaded, 'getTimesLoaded', 'unknown');
  reactHotLoader.register(getDependencies, 'getDependencies', 'unknown');
  reactHotLoader.register(getDevDependencies, 'getDevDependencies', 'unknown');
  reactHotLoader.register(getDependenciesAsArray, 'getDependenciesAsArray', 'unknown');
  reactHotLoader.register(getDevDependenciesAsArray, 'getDevDependenciesAsArray', 'unknown');
  reactHotLoader.register(selectors, 'selectors', 'unknown');
  reactHotLoader.register(Resource, 'Resource', 'unknown');
  reactHotLoader.register(initialState, 'initialState', 'unknown');
  reactHotLoader.register(watcherSaga, 'watcherSaga', 'unknown');
  reactHotLoader.register(fetchPackageInfo, 'fetchPackageInfo', 'unknown');
  reactHotLoader.register(sagas, 'sagas', 'unknown');
  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/state/route.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionReducers = exports.initialState = exports.namespace = undefined;

var _reduxAutomap = require('redux-automap');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var namespace = exports.namespace = 'route';

// initial state for reducer
var initialState = exports.initialState = '/';

// define all action/reducer pairs here... add "type" attributes for
var actionReducers = exports.actionReducers = [{
  change: function change(path) {
    return { type: 'route/CHANGE', path: path };
  },
  reducer: function reducer(state, action) {
    return action.path;
  }
}];

var _default = (0, _reduxAutomap.automap)({ namespace: namespace, actionReducers: actionReducers, initialState: initialState });

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(namespace, 'namespace', 'unknown');
  reactHotLoader.register(initialState, 'initialState', 'unknown');
  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/state/dashboards.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionReducers = exports.initialState = exports.selectors = exports.namespace = undefined;

var _immutable = require('immutable');

var _reduxAutomap = require('redux-automap');

var _reselect = require('reselect');

var _dashboards = require('./dashboards.models');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var namespace = exports.namespace = 'dashboards';

var getTags = function getTags(state) {
  return state.get('tags');
};
var getGroups = function getGroups(state) {
  return state.get('groups');
};
var findTag = function findTag(state, id) {
  return state.get('tags').find(function (tag) {
    return tag.get('id') === id;
  });
};
var findGroup = function findGroup(state, id) {
  return state.get('groups').find(function (group) {
    return group.get('id') === id;
  });
};
var getLastId = function getLastId(items) {
  return items.maxBy(function (i) {
    return i.get('id');
  }).get('id');
};
var getLastTagID = (0, _reselect.createSelector)(getTags, getLastId);
var getLastGroupID = (0, _reselect.createSelector)(getGroups, getLastId);

var selectors = exports.selectors = {
  getTags: getTags, findTag: findTag

  // initial state for reducer
};var initialState = exports.initialState = (0, _immutable.fromJS)({
  tags: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }, { id: 4, name: 'cat' }, { id: 5, name: 'miffles' }, { id: 6, name: 'vlad' }, { id: 7, name: 'baxter' }],
  groups: [new _dashboards.Group({ id: 1, name: 'First Group' })]
});

// define all action/reducer pairs here... add "type" attributes for
var actionReducers = exports.actionReducers = [{
  addGroup: function addGroup(name, parent) {
    return { type: 'list/ADD_GROUP', name: name, parent: parent };
  },
  reducer: function reducer(state, action) {
    var nextID = getLastGroupID(state) + 1;

    return state.update('groups', function (groups) {
      return groups.push(new _dashboards.Group({ id: nextID, name: action.name, parent: action.parent }));
    });
  }
}, {
  addTagToGroup: function addTagToGroup(tagID, groupID) {
    return { type: 'list/ADD_TAG_TO_GROUP', tagID: tagID, groupID: groupID };
  },
  reducer: function reducer(state, action) {
    var tag = findTag(state, action.tagID);
    var matchedGroup = findGroup(state, action.groupID);

    console.log('matched tag', tag.toJS());
    console.log('matched group', matchedGroup.toJS());

    if (!tag) {
      throw new Error('no tag found with id=' + tagID, action);
      return state;
    }

    if (!matchedGroup) {
      throw new Error('no group found with id=' + groupID, action);
      return state;
    }

    return state.update('groups', function (groups) {
      return groups.map(function (group) {
        return group === matchedGroup ? group.update('tags', function (tags) {
          return tags.push(new _dashboards.GroupedTag({ id: tag.get('id'), name: tag.get('name') }));
        }) : group;
      });
    });
  }
}];

var _default = (0, _reduxAutomap.automap)({ namespace: namespace, actionReducers: actionReducers, initialState: initialState, selectors: selectors });

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(namespace, 'namespace', 'unknown');
  reactHotLoader.register(getTags, 'getTags', 'unknown');
  reactHotLoader.register(getGroups, 'getGroups', 'unknown');
  reactHotLoader.register(findTag, 'findTag', 'unknown');
  reactHotLoader.register(findGroup, 'findGroup', 'unknown');
  reactHotLoader.register(getLastId, 'getLastId', 'unknown');
  reactHotLoader.register(getLastTagID, 'getLastTagID', 'unknown');
  reactHotLoader.register(getLastGroupID, 'getLastGroupID', 'unknown');
  reactHotLoader.register(selectors, 'selectors', 'unknown');
  reactHotLoader.register(initialState, 'initialState', 'unknown');
  reactHotLoader.register(actionReducers, 'actionReducers', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/state/dashboards.models.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupedTag = exports.Tag = exports.Group = undefined;

var _immutable = require('immutable');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

// initial state for reducer
var Group = exports.Group = new _immutable.Record({
  id: undefined,
  path: ['Assets', 'Region 1', 'Pumps'],
  name: 'New Group',
  parent: undefined,
  tags: new _immutable.List()
});

// initial state for reducer
var Tag = exports.Tag = new _immutable.Record({
  id: undefined,
  name: 'New Tag'
});

var GroupedTag = exports.GroupedTag = new _immutable.Record({
  id: undefined,
  name: 'New Grouped Tag'
});

// initial state for reducer
var _default = {
  Group: Group, Tag: Tag, GroupedTag: GroupedTag
};
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Group, 'Group', 'unknown');
  reactHotLoader.register(Tag, 'Tag', 'unknown');
  reactHotLoader.register(GroupedTag, 'GroupedTag', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/App.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _reactHotLoader = require('react-hot-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'Parcel Test'
    ),
    _react2.default.createElement(_Nav2.default, null),
    _react2.default.createElement(
      'div',
      { className: 'page-content' },
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _Nav.routes.map(function (route) {
          return _react2.default.createElement(_reactRouterDom.Route, {
            key: route.path,
            path: route.path,
            component: route.component
          });
        }),
        _react2.default.createElement(_reactRouterDom.Redirect, { from: '/', exact: true, to: _Nav.routes.length && _Nav.routes[0].path })
      )
    )
  );
};

var _default = (0, _reactHotLoader.hot)(module)(App);

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, 'App', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/Nav.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRouterDom = require('react-router-dom');

var _List = require('./pages/List');

var _List2 = _interopRequireDefault(_List);

var _Package = require('./pages/Package');

var _Package2 = _interopRequireDefault(_Package);

var _Groups = require('./pages/Groups');

var _Groups2 = _interopRequireDefault(_Groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

// pages


var routes = exports.routes = [{ path: '/list', name: 'List', component: _List2.default }, { path: '/package', name: 'Package', component: _Package2.default }, { path: '/groups', name: 'Groups Demo', component: _Groups2.default }];

var _default = function _default() {
  return _react2.default.createElement(
    _semanticUiReact.Menu,
    { pointing: true, secondary: true, className: 'navigation' },
    routes.map(function (route) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, {
        key: route.path,
        to: route.path,
        name: route.name,
        as: _reactRouterDom.NavLink
      });
    })
  );
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(routes, 'routes', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/List/index.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactWrappers = require('react-wrappers');

var _semanticUiReact = require('semantic-ui-react');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _AddItem = require('./AddItem');

var _AddItem2 = _interopRequireDefault(_AddItem);

var _list = require('../../../state/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var List = exports.List = function List(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      addItem = _ref.addItem,
      _removeItem = _ref.removeItem,
      _toggleIsActive = _ref.toggleIsActive;
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(_AddItem2.default, { addItem: addItem }),
    _react2.default.createElement(
      _semanticUiReact.Divider,
      { horizontal: true },
      items.length,
      ' Items'
    ),
    _react2.default.createElement(
      _semanticUiReact.Table,
      { compact: true, celled: true, definition: true },
      _react2.default.createElement(
        _semanticUiReact.Table.Header,
        null,
        _react2.default.createElement(
          _semanticUiReact.Table.Row,
          null,
          _react2.default.createElement(_semanticUiReact.Table.HeaderCell, null),
          _react2.default.createElement(
            _semanticUiReact.Table.HeaderCell,
            null,
            'Id'
          ),
          _react2.default.createElement(
            _semanticUiReact.Table.HeaderCell,
            null,
            'Name'
          ),
          _react2.default.createElement(
            _semanticUiReact.Table.HeaderCell,
            null,
            'Created'
          ),
          _react2.default.createElement(
            _semanticUiReact.Table.HeaderCell,
            null,
            'Active'
          )
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Table.Body,
        null,
        items.map(function (item) {
          return _react2.default.createElement(_Item2.default, {
            key: item.id,
            item: item,
            removeItem: function removeItem() {
              return _removeItem(item.id);
            },
            toggleIsActive: function toggleIsActive() {
              return _toggleIsActive(item.id);
            }
          });
        })
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    items: _list2.default.getItems(state)
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, _list2.default.actions)((0, _reactWrappers.fromImmutable)(List));

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(List, 'List', 'unknown');
  reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/List/Item.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _humanizeDuration = require('humanize-duration');

var _humanizeDuration2 = _interopRequireDefault(_humanizeDuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var item = _ref.item,
      removeItem = _ref.removeItem,
      toggleIsActive = _ref.toggleIsActive;

  return _react2.default.createElement(
    _semanticUiReact.Table.Row,
    null,
    _react2.default.createElement(
      _semanticUiReact.Table.Cell,
      { width: 1 },
      _react2.default.createElement(_semanticUiReact.Button, {
        circular: true,
        icon: 'trash',
        fluid: true, size: 'mini',
        onClick: removeItem,
        disabled: item.isActive
      })
    ),
    _react2.default.createElement(
      _semanticUiReact.Table.Cell,
      { width: 1 },
      item.id
    ),
    _react2.default.createElement(
      _semanticUiReact.Table.Cell,
      null,
      item.name
    ),
    _react2.default.createElement(
      _semanticUiReact.Table.Cell,
      null,
      'created ',
      (0, _humanizeDuration2.default)(new Date() - item.date, { round: true }),
      ' ago'
    ),
    _react2.default.createElement(
      _semanticUiReact.Table.Cell,
      { width: 1 },
      _react2.default.createElement(_semanticUiReact.Checkbox, {
        toggle: true,
        checked: item.isActive,
        onClick: toggleIsActive
      })
    )
  );
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/List/AddItem.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var AddItem = function (_React$Component) {
  (0, _inherits3.default)(AddItem, _React$Component);

  function AddItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddItem.__proto__ || (0, _getPrototypeOf2.default)(AddItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: 'foo'
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddItem, [{
    key: 'update',
    value: function update(e) {
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      var itemName = this.state.value || 'new item';
      this.props.addItem(itemName);
      this.setState({ value: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _semanticUiReact.Form,
        { onSubmit: this.addItem.bind(this) },
        _react2.default.createElement(_semanticUiReact.Input, {
          fluid: true,
          placeholder: 'New Item',
          action: { labelPosition: 'right', icon: 'plus', content: 'Add Item' },
          actionPosition: 'left',
          onChange: this.update.bind(this),
          value: this.state.value
        })
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return AddItem;
}(_react2.default.Component);

var _default = AddItem;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddItem, 'AddItem', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/Package/index.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Package = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRedux = require('react-redux');

var _reactWrappers = require('react-wrappers');

var _Dependencies = require('./Dependencies');

var _Dependencies2 = _interopRequireDefault(_Dependencies);

var _ErrorMessage = require('../../messages/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _api = require('../../../state/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _api$actions = _api2.default.actions,
    loadPackageInfo = _api$actions.loadPackageInfo,
    loadPackageInfoSuccess = _api$actions.loadPackageInfoSuccess;
var Package = exports.Package = function Package(_ref) {
  var pkg = _ref.pkg,
      deps = _ref.deps,
      devDeps = _ref.devDeps,
      timesLoaded = _ref.timesLoaded,
      loadPackageInfo = _ref.loadPackageInfo;
  return _react2.default.createElement(
    'div',
    { className: 'package-loader' },
    _react2.default.createElement(
      _semanticUiReact.Button,
      { fluid: true, disabled: pkg.isLoading, onClick: loadPackageInfo, loading: pkg.isLoading },
      deps && (0, _keys2.default)(deps).length ? 'Reload Package (loaded ' + timesLoaded + ' times)' : 'Load Package'
    ),
    deps && _react2.default.createElement(_Dependencies2.default, { deps: deps, devDeps: devDeps }),
    pkg.error && _react2.default.createElement(
      _ErrorMessage2.default,
      null,
      pkg.error
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    pkg: _api2.default.getPackage(state),
    deps: _api2.default.getDependenciesAsArray(state),
    devDeps: _api2.default.getDevDependenciesAsArray(state),
    timesLoaded: _api2.default.getTimesLoaded(state)
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadPackageInfo: loadPackageInfo
})((0, _reactWrappers.fromImmutable)(Package));

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(loadPackageInfo, 'loadPackageInfo', 'unknown');
  reactHotLoader.register(loadPackageInfoSuccess, 'loadPackageInfoSuccess', 'unknown');
  reactHotLoader.register(Package, 'Package', 'unknown');
  reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/Package/Dependencies.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var deps = _ref.deps,
      devDeps = _ref.devDeps;
  return _react2.default.createElement(
    _semanticUiReact.Message,
    { positive: true },
    _react2.default.createElement(
      _semanticUiReact.Grid,
      { columns: 2, divided: true },
      _react2.default.createElement(
        _semanticUiReact.Grid.Row,
        null,
        _react2.default.createElement(
          _semanticUiReact.Grid.Column,
          null,
          _react2.default.createElement(_List2.default, { name: 'Dependencies', libs: deps })
        ),
        _react2.default.createElement(
          _semanticUiReact.Grid.Column,
          null,
          _react2.default.createElement(_List2.default, { name: 'Dev. Dependencies', libs: devDeps })
        )
      )
    )
  );
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/Package/List.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var name = _ref.name,
      libs = _ref.libs;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_semanticUiReact.Statistic, { horizontal: true, color: 'green', label: name, value: libs.length }),
    _react2.default.createElement(
      _semanticUiReact.List,
      null,
      libs && libs.map(function (lib) {
        return _react2.default.createElement(
          _semanticUiReact.List.Item,
          { key: lib.name },
          _react2.default.createElement(
            'b',
            null,
            lib.name
          ),
          ': ',
          lib.version
        );
      })
    )
  );
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/messages/ErrorMessage.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    _semanticUiReact.Message,
    { negative: true },
    _react2.default.createElement(
      _semanticUiReact.Message.Header,
      null,
      'We\'ve encountered an error.'
    ),
    _react2.default.createElement(
      'p',
      null,
      children
    )
  );
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/Groups/index.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Groups = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _GroupsNavigation = require('./GroupsNavigation');

var _GroupsNavigation2 = _interopRequireDefault(_GroupsNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var cards = Array(7).fill(0).map(function (i) {
  return { name: 'Tag #' + Math.random().toString().slice(0, 6) };
});

var Groups = exports.Groups = function Groups() {
  return _react2.default.createElement(
    _semanticUiReact.Grid,
    { divided: true },
    _react2.default.createElement(
      _semanticUiReact.Grid.Row,
      null,
      _react2.default.createElement(
        _semanticUiReact.Grid.Column,
        { width: 4 },
        _react2.default.createElement(_GroupsNavigation2.default, null)
      ),
      _react2.default.createElement(
        _semanticUiReact.Grid.Column,
        { width: 12 },
        _react2.default.createElement(
          _semanticUiReact.Card.Group,
          { className: 'cards', itemsPerRow: 3 },
          cards.map(function (card) {
            return _react2.default.createElement(_semanticUiReact.Card, { key: card.name, header: card.name, description: card.name });
          })
        )
      )
    )
  );
};

var _default = Groups;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cards, 'cards', 'unknown');
  reactHotLoader.register(Groups, 'Groups', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
___scope___.file("client/components/pages/Groups/GroupsNavigation.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var GroupsNavigation = function (_React$Component) {
  (0, _inherits3.default)(GroupsNavigation, _React$Component);

  function GroupsNavigation(props) {
    (0, _classCallCheck3.default)(this, GroupsNavigation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupsNavigation.__proto__ || (0, _getPrototypeOf2.default)(GroupsNavigation)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(GroupsNavigation, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Groups'
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return GroupsNavigation;
}(_react2.default.Component);

var _default = GroupsNavigation;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GroupsNavigation, 'GroupsNavigation', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;
});
return ___scope___.entry = "client/index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
} else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };

    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
            this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error ||
                (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError("Uncaught, unspecified \"error\" event.");
            }
        }

        handler = this._events[type];

        if (isUndefined(handler))
            return false;

        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                    // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return true;
    };

    EventEmitter.prototype.addListener = function(type, listener) {
        var m;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events)
            this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type,
                isFunction(listener.listener) ?
                listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
            this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " +
                    "leak detected. %d listeners added. " +
                    "Use emitter.setMaxListeners() to increase limit.",
                    this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        var fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events || !this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
            (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);

        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0)
                return this;

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }

        return this;
    };

    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;

        if (!this._events)
            return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
    };

    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };

    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];

            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };

    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
    };

    function isFunction(arg) {
        return typeof arg === "function";
    }

    function isNumber(arg) {
        return typeof arg === "number";
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }

    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('fusebox-websocket').SocketClient, bundleErrors = {}, outputElement = document.createElement('div'), styleElement = document.createElement('style'), minimizeToggleId = 'fuse-box-toggle-minimized', hideButtonId = 'fuse-box-hide', expandedOutputClass = 'fuse-box-expanded-output', localStoragePrefix = '__fuse-box_';
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === 'true' ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = 'fuse-box-output';
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbps;&npbs;&nbps;')
                .replace(/ /g, '&nbsp;');
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join('');
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? 'Expand' : 'Minimize') + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? '' : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri,
    });
    client.connect();
    client.on('page-reload', function (data) {
        return window.location.reload();
    });
    client.on('page-hmr', function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === 'string') {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on('source-changed', function (data) {
        console.info("%cupdate \"" + data.path + "\"", 'color: #237abe');
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, '').replace(/[\.\/]+/g, '-');
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement('link');
                node.id = fileId;
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = data.path;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
        if (data.type === 'js' || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === 'string') {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on('error', function (error) {
        console.log(error);
    });
    client.on('bundle-error', function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on('update-bundle-errors', function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require('events');
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        var domain = location.hostname || 'localhost';
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit('reconnect', { message: 'Trying to reconnect' });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log('%cConnecting to fusebox HMR at ' + this.url, 'color: #237abe');
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit('error', data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log('%cConnected', 'color: #237abe');
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: 'Socket error' });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit('close', { message: 'Socket closed' });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit('*', item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.import("fusebox-hot-reload").connect(4445, "", false)

FuseBox.import("default/client/index.js");
FuseBox.main("default/client/index.js");
})
(FuseBox)