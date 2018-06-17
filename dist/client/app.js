(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("client/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
require("semantic-ui-css/semantic.min.css");
require("antd/dist/antd.min.css");
require("./styles/base.scss");
require("./styles/base.less");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var redux_immutable_1 = require("redux-immutable");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var redux_saga_1 = require("redux-saga");
// history
var createBrowserHistory_1 = require("history/createBrowserHistory");
var history = createBrowserHistory_1["default"]();
var state_1 = require("./state");
var App_1 = require("./components/App");
var api_1 = require("./state/api");
var route_1 = require("./state/route");
var dashboards_1 = require("./state/dashboards");
var sagaMiddleware = redux_saga_1["default"]();
var rootReducer = redux_immutable_1.combineReducers(state_1["default"]);
var store = redux_1.createStore(rootReducer, redux_1.compose(redux_1.applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// history binding... messy, abstract elsewhere or turn into module
history.listen(function (location) {
    var path = "" + location.pathname + location.search + location.hash;
    store.dispatch(route_1["default"].actions.change(path));
});
store.dispatch(dashboards_1["default"].addGroup('Newish Group', 1));
store.dispatch(dashboards_1["default"].addTagToGroup(6, 2));
var path = "" + location.pathname + location.search + location.hash;
store.dispatch(route_1["default"].actions.change(path));
// register sagas
sagaMiddleware.run(api_1["default"].sagas.watcherSaga);
react_dom_1["default"].render(react_1["default"].createElement(react_redux_1.Provider, { store: store },
    react_1["default"].createElement(react_router_dom_1.HashRouter, null,
        react_1["default"].createElement(App_1["default"], null))), document.getElementById('app'));
//# sourceMappingURL=index.js.map
});
___scope___.file("client/styles/base.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("client/styles/base.scss", "body {\n  color: #222;\n  font-family: sans-serif;\n  font-weight: lighter;\n  height: 100%;\n  width: 100%;\n  position: relative; }\n  body:before {\n    content: '';\n    z-index: -1;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    opacity: 0.2; }\n  body #app {\n    padding: 1em 2em; }\n\n.navigation:hover .item {\n  border-bottom-color: transparent !important; }\n\n.navigation .item {\n  transition: all 0.3s ease !important; }\n  .navigation .item:hover {\n    border-color: #1b1c1d !important; }\n\n.cards > .card {\n  box-shadow: none !important; }\n\n.page-content {\n  padding-top: 1em; }\n\nul {\n  list-style-type: none;\n  padding: 0; }\n\nli {\n  margin-bottom: 0.5em; }\n\n.pages {\n  position: relative; }\n  .pages > * {\n    position: absolute;\n    width: 100%; }\n\n.padded {\n  padding: 1em; }\n\n/*# sourceMappingURL=/css-sourcemaps/3143e84.map */")
});
___scope___.file("client/styles/base.less", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("client/styles/base.less", "body {\n  color: red;\n}\n")
});
___scope___.file("client/state/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var redux_automap_1 = require("redux-automap");
var list_1 = require("./list");
var api_1 = require("./api");
var route_1 = require("./route");
var dashboards_1 = require("./dashboards");
console.log('dashboards', dashboards_1["default"]);
exports["default"] = redux_automap_1.merge([list_1["default"], api_1["default"], route_1["default"], dashboards_1["default"]]);
//# sourceMappingURL=index.js.map
});
___scope___.file("client/state/list.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
var redux_automap_1 = require("redux-automap");
var reselect_1 = require("reselect");
exports.namespace = 'list';
var getItems = function (state) { return state.get('items'); };
var getNumItems = function (state) { return state.get('items').size; };
var getHalfItems = function (items, number) { return items.slice(0, Math.floor(number / 2)); };
var getItemsSorted = reselect_1.createSelector([getItems], function (items) {
    return items.sort(function (a, b) {
        a = a.get('name');
        b = b.get('name');
        return a < b ? -1 : (a > b ? 1 : 0);
    }).reverse();
});
var getHalfItemsUnsorted = reselect_1.createSelector([getItems, getNumItems], getHalfItems);
var getHalfItemsSorted = reselect_1.createSelector([getItemsSorted, getNumItems], getHalfItems);
exports.selectors = {
    getItems: getItems, getNumItems: getNumItems, getItemsSorted: getItemsSorted, getHalfItemsUnsorted: getHalfItemsUnsorted, getHalfItemsSorted: getHalfItemsSorted
};
var Entry = new immutable_1.Record({
    id: undefined,
    name: 'new item',
    date: new Date,
    isActive: false
});
// initial state for reducer
exports.initialState = immutable_1.fromJS({
    items: [
        { id: 1, name: 'foo', date: new Date, isActive: true },
        { id: 2, name: 'bar', date: new Date, isActive: true },
        { id: 3, name: 'baz', date: new Date, isActive: true },
        { id: 4, name: 'cat', date: new Date, isActive: false },
        { id: 5, name: 'miffles', date: new Date, isActive: false },
        { id: 6, name: 'vlad', date: new Date, isActive: true },
        { id: 7, name: 'baxter', date: new Date, isActive: true },
    ]
});
// define all action/reducer pairs here... add "type" attributes for
exports.actionReducers = [
    {
        addItem: function (name) {
            if (name === void 0) { name = 'new item'; }
            return ({ type: 'list/ADD_ITEM', name: name });
        },
        reducer: function (state, action) {
            var nextID = state.get('items').maxBy(function (i) { return i.get('id'); }).get('id') + 1;
            return state.update('items', function (items) { return items.push(new Entry({
                id: nextID,
                name: action.name,
                date: new Date
            })); });
        }
    },
    {
        toggleIsActive: function (id) { return ({ type: 'list/TOGGLE_ITEM_IS_ACTIVE', id: id }); },
        reducer: function (state, action) { return state.update('items', function (items) { return items.map(function (item) { return item.get('id') === action.id ? item.update('isActive', function (active) { return !active; }) : item; }); }); }
    },
    {
        // type: constants.REMOVE_ITEM,
        removeItem: function (id) { return ({ type: 'list/REMOVE_ITEM', id: id }); },
        reducer: function (state, action) {
            return state.update('items', function (items) { return items.filter(function (i) { return i.get('id') !== action.id; }); });
        }
    }
];
exports["default"] = redux_automap_1.automap({ namespace: exports.namespace, actionReducers: exports.actionReducers, initialState: exports.initialState, selectors: exports.selectors, foo: 'bar' });
//# sourceMappingURL=list.js.map
});
___scope___.file("client/state/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var redux_automap_1 = require("redux-automap");
var reselect_1 = require("reselect");
var axios_1 = require("axios");
var effects_1 = require("redux-saga/lib/effects.js");
exports.namespace = 'api';
var byName = function (a, b) { return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0); };
var toDepsArray = function (deps) { return deps && Object
    .entries(deps.toJS())
    .map(function (i) { return ({ name: i[0], version: i[1] }); })
    .sort(byName); };
var getPackage = function (state) { return state.getIn(['package']); };
var getTimesLoaded = function (state) { return state.get('timesLoaded'); };
var getDependencies = function (state) { return state.getIn(['package', 'data', 'dependencies']); };
var getDevDependencies = function (state) { return state.getIn(['package', 'data', 'devDependencies']); };
var getDependenciesAsArray = reselect_1.createSelector([getDependencies], toDepsArray);
var getDevDependenciesAsArray = reselect_1.createSelector([getDevDependencies], toDepsArray);
var selectors = {
    getPackage: getPackage,
    getTimesLoaded: getTimesLoaded,
    getDependencies: getDependencies,
    getDevDependencies: getDevDependencies,
    getDependenciesAsArray: getDependenciesAsArray,
    getDevDependenciesAsArray: getDevDependenciesAsArray
};
var Resource = immutable_1.Record({
    isLoading: false,
    success: undefined,
    error: undefined,
    data: undefined
});
// initial state for reducer
exports.initialState = immutable_1.fromJS({
    package: new Resource,
    timesLoaded: 0
});
// watcher saga: watches for actions dispatched to the store, starts worker saga
function watcherSaga() {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest('api/LOAD_PACKAGE_INFO', fetchPackageInfo)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
function fetchPackageInfo() {
    var data, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('fetchPackageInfo saga triggered');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 6]);
                return [4 /*yield*/, effects_1.call(function () { return axios_1["default"].get('/package.json').then(function (r) { return immutable_1.fromJS(r.data); }); })];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, effects_1.put({ type: "api/LOAD_PACKAGE_INFO_SUCCESS", data: data })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                console.log('error', error_1);
                return [4 /*yield*/, effects_1.put({ type: "api/LOAD_PACKAGE_INFO_ERROR", error: error_1.message })
                    // throw new Error(error)
                ];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}
var sagas = {
    watcherSaga: watcherSaga,
    fetchPackageInfo: fetchPackageInfo
};
// define all action/reducer pairs here... add "type" attributes for
exports.actionReducers = [
    {
        loadPackageInfo: function () { return ({ type: 'api/LOAD_PACKAGE_INFO' }); },
        reducer: function (state) { return state.set('package', new Resource({ isLoading: true, data: state.getIn(['package', 'data']) })); }
    },
    {
        loadPackageInfoSuccess: function (data) { return ({ type: 'api/LOAD_PACKAGE_INFO_SUCCESS', data: data }); },
        reducer: function (state, action) { return state
            .set('package', new Resource({ isLoading: false, success: true, data: action.data }))
            .update('timesLoaded', function (count) { return count + 1; }); }
    },
    {
        loadPackageInfoError: function (error) { return ({ type: 'api/LOAD_PACKAGE_INFO_ERROR', error: error }); },
        reducer: function (state, action) { return state.set('package', new Resource({ error: action.error, success: false })); }
    }
];
exports["default"] = redux_automap_1.automap({ sagas: sagas, namespace: exports.namespace, actionReducers: exports.actionReducers, initialState: exports.initialState, selectors: selectors });
//# sourceMappingURL=api.js.map
});
___scope___.file("client/state/route.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var redux_automap_1 = require("redux-automap");
exports.namespace = 'route';
// initial state for reducer
exports.initialState = '/';
// define all action/reducer pairs here... add "type" attributes for
exports.actionReducers = [
    {
        change: function (path) { return ({ type: 'route/CHANGE', path: path }); },
        reducer: function (state, action) { return action.path; }
    }
];
exports["default"] = redux_automap_1.automap({ namespace: exports.namespace, actionReducers: exports.actionReducers, initialState: exports.initialState });
//# sourceMappingURL=route.js.map
});
___scope___.file("client/state/dashboards.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
var redux_automap_1 = require("redux-automap");
var reselect_1 = require("reselect");
var dashboards_models_1 = require("./dashboards.models");
exports.namespace = 'dashboards';
var getTags = function (state) { return state.get('tags'); };
var getGroups = function (state) { return state.get('groups'); };
var findTag = function (state, id) { return state
    .get('tags')
    .find(function (tag) { return tag.get('id') === id; }); };
var findGroup = function (state, id) { return state
    .get('groups')
    .find(function (group) { return group.get('id') === id; }); };
var getLastId = function (items) { return items.maxBy(function (i) { return i.get('id'); }).get('id'); };
// const getLastTagID = createSelector(getTags, getLastId)
var getLastGroupID = reselect_1.createSelector(getGroups, getLastId);
exports.selectors = {
    getTags: getTags, findTag: findTag
};
// initial state for reducer
exports.initialState = immutable_1.fromJS({
    tags: [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
        { id: 3, name: 'baz' },
        { id: 4, name: 'cat' },
        { id: 5, name: 'miffles' },
        { id: 6, name: 'vlad' },
        { id: 7, name: 'baxter' },
    ],
    groups: [
        new dashboards_models_1.Group({ id: 1, name: 'First Group' })
    ]
});
// define all action/reducer pairs here... add "type" attributes for
exports.actionReducers = [
    {
        addGroup: function (name, parent) { return ({ type: 'list/ADD_GROUP', name: name, parent: parent }); },
        reducer: function (state, action) {
            var nextID = getLastGroupID(state) + 1;
            return state.update('groups', function (groups) { return groups.push(new dashboards_models_1.Group({ id: nextID, name: action.name, parent: action.parent })); });
        }
    },
    {
        addTagToGroup: function (tagID, groupID) { return ({ type: 'list/ADD_TAG_TO_GROUP', tagID: tagID, groupID: groupID }); },
        reducer: function (state, action) {
            var tag = findTag(state, action.tagID);
            var matchedGroup = findGroup(state, action.groupID);
            console.log('matched tag', tag.toJS());
            console.log('matched group', matchedGroup.toJS());
            if (!tag)
                throw new Error("no tag found with id=" + action.tagID, action);
            if (!matchedGroup)
                throw new Error("no group found with id=" + action.groupID, action);
            return state
                .update('groups', function (groups) { return groups.map(function (group) { return group === matchedGroup
                ? group.update('tags', function (tags) { return tags.push(new dashboards_models_1.GroupedTag({ id: tag.get('id'), name: tag.get('name') })); })
                : group; }); });
        }
    },
];
exports["default"] = redux_automap_1.automap({ namespace: exports.namespace, actionReducers: exports.actionReducers, initialState: exports.initialState, selectors: exports.selectors });
//# sourceMappingURL=dashboards.js.map
});
___scope___.file("client/state/dashboards.models.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
// initial state for reducer
exports.Group = new immutable_1.Record({
    id: undefined,
    path: ['Assets', 'Region 1', 'Pumps'],
    name: 'New Group',
    parent: undefined,
    tags: new immutable_1.List()
});
// initial state for reducer
exports.Tag = new immutable_1.Record({
    id: undefined,
    name: 'New Tag'
});
exports.GroupedTag = new immutable_1.Record({
    id: undefined,
    name: 'New Grouped Tag'
});
// initial state for reducer
exports["default"] = {
    Group: exports.Group, Tag: exports.Tag, GroupedTag: exports.GroupedTag
};
//# sourceMappingURL=dashboards.models.js.map
});
___scope___.file("client/components/App.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Nav_1 = require("./Nav");
var react_hot_loader_1 = require("react-hot-loader");
var App = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Parcel Tester"),
        react_1["default"].createElement(Nav_1["default"], null),
        react_1["default"].createElement("div", { className: "page-content" },
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                Nav_1.routes.map(function (route) { return react_1["default"].createElement(react_router_dom_1.Route, { key: route.path, path: route.path, component: route.component }); }),
                react_1["default"].createElement(react_router_dom_1.Redirect, { from: "/", exact: true, to: Nav_1.routes.length && Nav_1.routes[0].path })))));
};
exports["default"] = react_hot_loader_1.hot(module)(App);
//# sourceMappingURL=App.js.map
});
___scope___.file("client/components/Nav.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_router_dom_1 = require("react-router-dom");
// pages
var List_1 = require("./pages/List");
var Package_1 = require("./pages/Package");
var Groups_1 = require("./pages/Groups");
exports.routes = [
    { path: '/list', name: 'List', component: List_1["default"] },
    { path: '/package', name: 'Package', component: Package_1["default"] },
    { path: '/groups', name: 'Groups Demo', component: Groups_1["default"] },
];
exports.Nav = function () {
    return react_1["default"].createElement(semantic_ui_react_1.Menu, { pointing: true, secondary: true, className: "navigation" }, exports.routes.map(function (route) { return react_1["default"].createElement(semantic_ui_react_1.Menu.Item, { key: route.path, to: route.path, name: route.name, as: react_router_dom_1.NavLink }); }));
};
exports["default"] = exports.Nav;
//# sourceMappingURL=Nav.js.map
});
___scope___.file("client/components/pages/List/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_wrappers_1 = require("react-wrappers");
var semantic_ui_react_1 = require("semantic-ui-react");
var Item_1 = require("./Item");
var AddItem_1 = require("./AddItem");
var list_1 = require("../../../state/list");
exports.List = function (_a) {
    var _b = _a.items, items = _b === void 0 ? [] : _b, addItem = _a.addItem, removeItem = _a.removeItem, toggleIsActive = _a.toggleIsActive;
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(AddItem_1["default"], { addItem: addItem }),
        react_1["default"].createElement(semantic_ui_react_1.Divider, { horizontal: true },
            items.length,
            " Items"),
        react_1["default"].createElement(semantic_ui_react_1.Table, { compact: true, celled: true, definition: true },
            react_1["default"].createElement(semantic_ui_react_1.Table.Header, null,
                react_1["default"].createElement(semantic_ui_react_1.Table.Row, null,
                    react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, null),
                    react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, null, "Id"),
                    react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, null, "Name"),
                    react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, null, "Created"),
                    react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, null, "Active"))),
            react_1["default"].createElement(semantic_ui_react_1.Table.Body, null, items.map(function (item) { return react_1["default"].createElement(Item_1["default"], { key: item.id, item: item, removeItem: function () { return removeItem(item.id); }, toggleIsActive: function () { return toggleIsActive(item.id); } }); }))));
};
var mapStateToProps = function (state) { return ({
    items: list_1["default"].getItems(state)
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, list_1["default"].actions)(react_wrappers_1.fromImmutable(exports.List));
//# sourceMappingURL=index.js.map
});
___scope___.file("client/components/pages/List/Item.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var humanize_duration_1 = require("humanize-duration");
exports.ListItem = function (_a) {
    var item = _a.item, removeItem = _a.removeItem, toggleIsActive = _a.toggleIsActive;
    return (react_1["default"].createElement(semantic_ui_react_1.Table.Row, null,
        react_1["default"].createElement(semantic_ui_react_1.Table.Cell, { width: 1 },
            react_1["default"].createElement(semantic_ui_react_1.Button, { circular: true, icon: "trash", fluid: true, size: "mini", onClick: removeItem, disabled: item.isActive })),
        react_1["default"].createElement(semantic_ui_react_1.Table.Cell, { width: 1 }, item.id),
        react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, item.name),
        react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null,
            "created ",
            humanize_duration_1["default"](new Date - item.date, { round: true }),
            " ago"),
        react_1["default"].createElement(semantic_ui_react_1.Table.Cell, { width: 1 },
            react_1["default"].createElement(semantic_ui_react_1.Checkbox, { toggle: true, checked: item.isActive, onClick: toggleIsActive }))));
};
exports["default"] = exports.ListItem;
//# sourceMappingURL=Item.js.map
});
return ___scope___.entry = "client/index.js";
});
FuseBox.import("fusebox-hot-reload").connect(4445, "", false)

FuseBox.import("default/client/index.js");
FuseBox.main("default/client/index.js");
})
((function(__root__){
if (__root__["FuseBox"]) return __root__["FuseBox"];
var $isServiceWorker = typeof ServiceWorkerGlobalScope !== "undefined";
var $isWebWorker = typeof WorkerGlobalScope !== "undefined";
var $isBrowser = typeof window !== "undefined" && typeof window.navigator !== "undefined" || $isWebWorker || $isServiceWorker;
var g = $isBrowser ? (($isWebWorker || $isServiceWorker) ? {} : window) : global;
if ($isBrowser) {
    g["global"] = ($isWebWorker || $isServiceWorker) ? {} : window;
}
__root__ = !$isBrowser || typeof __fbx__dnm__ !== "undefined" ? module.exports : __root__;
var $fsbx = $isBrowser ? ($isWebWorker || $isServiceWorker) ? {} : (window["__fsbx__"] = window["__fsbx__"] || {})
    : g["$fsbx"] = g["$fsbx"] || {};
if (!$isBrowser) {
    g["require"] = require;
}
var $packages = $fsbx.p = $fsbx.p || {};
var $events = $fsbx.e = $fsbx.e || {};
function $getNodeModuleName(name) {
    var n = name.charCodeAt(0);
    var s = name.charCodeAt(1);
    if (!$isBrowser && s === 58) {
        return;
    }
    if (n >= 97 && n <= 122 || n === 64) {
        if (n === 64) {
            var s_1 = name.split("/");
            var target = s_1.splice(2, s_1.length).join("/");
            return [s_1[0] + "/" + s_1[1], target || undefined];
        }
        var index = name.indexOf("/");
        if (index === -1) {
            return [name];
        }
        var first = name.substring(0, index);
        var second = name.substring(index + 1);
        return [first, second];
    }
}
;
function $getDir(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) || "./";
}
;
function $pathJoin() {
    var string = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        string[_i] = arguments[_i];
    }
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        parts = parts.concat(arguments[i].split("/"));
    }
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        if (!part || part === ".")
            continue;
        if (part === "..") {
            newParts.pop();
        }
        else {
            newParts.push(part);
        }
    }
    if (parts[0] === "")
        newParts.unshift("");
    return newParts.join("/") || (newParts.length ? "/" : ".");
}
;
function $ensureExtension(name) {
    var matched = name.match(/\.(\w{1,})$/);
    if (matched) {
        if (!matched[1]) {
            return name + ".js";
        }
        return name;
    }
    return name + ".js";
}
;
function $loadURL(url) {
    if ($isBrowser) {
        var d = document;
        var head = d.getElementsByTagName("head")[0];
        var target;
        if (/\.css$/.test(url)) {
            target = d.createElement("link");
            target.rel = "stylesheet";
            target.type = "text/css";
            target.href = url;
        }
        else {
            target = d.createElement("script");
            target.type = "text/javascript";
            target.src = url;
            target.async = true;
        }
        head.insertBefore(target, head.firstChild);
    }
}
;
function $loopObjKey(obj, func) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            func(key, obj[key]);
        }
    }
}
;
function $serverRequire(path) {
    return { server: require(path) };
}
;
function $getRef(name, o) {
    var basePath = o.path || "./";
    var pkgName = o.pkg || "default";
    var nodeModule = $getNodeModuleName(name);
    if (nodeModule) {
        basePath = "./";
        pkgName = nodeModule[0];
        if (o.v && o.v[pkgName]) {
            pkgName = pkgName + "@" + o.v[pkgName];
        }
        name = nodeModule[1];
    }
    if (name) {
        if (name.charCodeAt(0) === 126) {
            name = name.slice(2, name.length);
            basePath = "./";
        }
        else {
            if (!$isBrowser && (name.charCodeAt(0) === 47 || name.charCodeAt(1) === 58)) {
                return $serverRequire(name);
            }
        }
    }
    var pkg = $packages[pkgName];
    if (!pkg) {
        if ($isBrowser && FuseBox.target !== "electron") {
            throw "Package not found " + pkgName;
        }
        else {
            return $serverRequire(pkgName + (name ? "/" + name : ""));
        }
    }
    name = name ? name : "./" + pkg.s.entry;
    var filePath = $pathJoin(basePath, name);
    var validPath = $ensureExtension(filePath);
    var file = pkg.f[validPath];
    var wildcard;
    if (!file && validPath.indexOf("*") > -1) {
        wildcard = validPath;
    }
    if (!file && !wildcard) {
        validPath = $pathJoin(filePath, "/", "index.js");
        file = pkg.f[validPath];
        if (!file && filePath === ".") {
            validPath = pkg.s && pkg.s.entry || "index.js";
            file = pkg.f[validPath];
        }
        if (!file) {
            validPath = filePath + ".js";
            file = pkg.f[validPath];
        }
        if (!file) {
            file = pkg.f[filePath + ".jsx"];
        }
        if (!file) {
            validPath = filePath + "/index.jsx";
            file = pkg.f[validPath];
        }
    }
    return {
        file: file,
        wildcard: wildcard,
        pkgName: pkgName,
        versions: pkg.v,
        filePath: filePath,
        validPath: validPath,
    };
}
;
function $async(file, cb, o) {
    if (o === void 0) { o = {}; }
    if ($isBrowser) {
        if (o && o.ajaxed === file) {
            return console.error(file, 'does not provide a module');
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var contentType = xmlhttp.getResponseHeader("Content-Type");
                    var content = xmlhttp.responseText;
                    if (/json/.test(contentType)) {
                        content = "module.exports = " + content;
                    }
                    else {
                        if (!/javascript/.test(contentType)) {
                            content = "module.exports = " + JSON.stringify(content);
                        }
                    }
                    var normalized = $pathJoin("./", file);
                    FuseBox.dynamic(normalized, content);
                    cb(FuseBox.import(file, { ajaxed: file }));
                }
                else {
                    console.error(file, 'not found on request');
                    cb(undefined);
                }
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
    }
    else {
        if (/\.(js|json)$/.test(file))
            return cb(g["require"](file));
        return cb("");
    }
}
;
function $trigger(name, args) {
    var e = $events[name];
    if (e) {
        for (var i in e) {
            var res = e[i].apply(null, args);
            if (res === false) {
                return false;
            }
        }
        ;
    }
}
;
function syntheticDefaultExportPolyfill(input) {
    return input !== null && ['function', 'object', 'array']
        .indexOf(typeof input) > -1 && input.default === undefined ?
        Object.isFrozen(input) ? input.default = input : Object.defineProperty(input, "default", { value: input, writable: true, enumerable: false }) : void 0;
}
function $import(name, o) {
    if (o === void 0) { o = {}; }
    if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58) {
        return $loadURL(name);
    }
    var ref = $getRef(name, o);
    if (ref.server) {
        return ref.server;
    }
    var file = ref.file;
    if (ref.wildcard) {
        var safeRegEx = new RegExp(ref.wildcard
            .replace(/\*/g, "@")
            .replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            .replace(/@@/g, ".*")
            .replace(/@/g, "[a-z0-9$_-]+"), "i");
        var pkg_1 = $packages[ref.pkgName];
        if (pkg_1) {
            var batch = {};
            for (var n in pkg_1.f) {
                if (safeRegEx.test(n)) {
                    batch[n] = $import(ref.pkgName + "/" + n);
                }
            }
            return batch;
        }
    }
    if (!file) {
        var asyncMode_1 = typeof o === "function";
        var processStopped = $trigger("async", [name, o]);
        if (processStopped === false) {
            return;
        }
        return $async(name, function (result) { return asyncMode_1 ? o(result) : null; }, o);
    }
    var pkg = ref.pkgName;
    if (file.locals && file.locals.module)
        return file.locals.module.exports;
    var locals = file.locals = {};
    var path = $getDir(ref.validPath);
    locals.exports = {};
    locals.module = { exports: locals.exports };
    locals.require = function (name, optionalCallback) {
        var result = $import(name, {
            pkg: pkg,
            path: path,
            v: ref.versions,
        });
        if (FuseBox["sdep"]) {
            syntheticDefaultExportPolyfill(result);
        }
        return result;
    };
    if ($isBrowser || !g["require"].main) {
        locals.require.main = { filename: "./", paths: [] };
    }
    else {
        locals.require.main = g["require"].main;
    }
    var args = [locals.module.exports, locals.require, locals.module, ref.validPath, path, pkg];
    $trigger("before-import", args);
    file.fn.apply(args[0], args);
    $trigger("after-import", args);
    return locals.module.exports;
}
;
var FuseBox = (function () {
    function FuseBox() {
    }
    FuseBox.global = function (key, obj) {
        if (obj === undefined)
            return g[key];
        g[key] = obj;
    };
    FuseBox.import = function (name, o) {
        return $import(name, o);
    };
    FuseBox.on = function (n, fn) {
        $events[n] = $events[n] || [];
        $events[n].push(fn);
    };
    FuseBox.exists = function (path) {
        try {
            var ref = $getRef(path, {});
            return ref.file !== undefined;
        }
        catch (err) {
            return false;
        }
    };
    FuseBox.remove = function (path) {
        var ref = $getRef(path, {});
        var pkg = $packages[ref.pkgName];
        if (pkg && pkg.f[ref.validPath]) {
            delete pkg.f[ref.validPath];
        }
    };
    FuseBox.main = function (name) {
        this.mainFile = name;
        return FuseBox.import(name, {});
    };
    FuseBox.expose = function (obj) {
        var _loop_1 = function (k) {
            var alias = obj[k].alias;
            var xp = $import(obj[k].pkg);
            if (alias === "*") {
                $loopObjKey(xp, function (exportKey, value) { return __root__[exportKey] = value; });
            }
            else if (typeof alias === "object") {
                $loopObjKey(alias, function (exportKey, value) { return __root__[value] = xp[exportKey]; });
            }
            else {
                __root__[alias] = xp;
            }
        };
        for (var k in obj) {
            _loop_1(k);
        }
    };
    FuseBox.dynamic = function (path, str, opts) {
        this.pkg(opts && opts.pkg || "default", {}, function (___scope___) {
            ___scope___.file(path, function (exports, require, module, __filename, __dirname) {
                var res = new Function("__fbx__dnm__", "exports", "require", "module", "__filename", "__dirname", "__root__", str);
                res(true, exports, require, module, __filename, __dirname, __root__);
            });
        });
    };
    FuseBox.flush = function (shouldFlush) {
        var def = $packages["default"];
        for (var fileName in def.f) {
            if (!shouldFlush || shouldFlush(fileName)) {
                delete def.f[fileName].locals;
            }
        }
    };
    FuseBox.pkg = function (name, v, fn) {
        if ($packages[name])
            return fn($packages[name].s);
        var pkg = $packages[name] = {};
        pkg.f = {};
        pkg.v = v;
        pkg.s = {
            file: function (name, fn) { return pkg.f[name] = { fn: fn }; },
        };
        return fn(pkg.s);
    };
    FuseBox.addPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    FuseBox.packages = $packages;
    FuseBox.isBrowser = $isBrowser;
    FuseBox.isServer = !$isBrowser;
    FuseBox.plugins = [];
    return FuseBox;
}());
if (!$isBrowser) {
    g["FuseBox"] = FuseBox;
}

return __root__["FuseBox"] = FuseBox; } )(this))
//# sourceMappingURL=app.js.map