'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var compression = _interopDefault(require('compression'));
var APP_ROOT = _interopDefault(require('app-root-path'));

var name = "parcel-test";
var version = "1.0.0";
var description = "testing parcel build process with react, sass, express";
var main = "dist/index.js";
var scripts = {
	start: "node dist/index.js",
	test: "echo \"Error: no test specified\" && exit 1",
	clean: "rm -rf dist",
	"dev:client": "parcel watch client/index.html --out-dir dist/client",
	"dev:server": "nodemon --watch ./server --exec babel-node ./server/index.js",
	"build:client": "parcel build client/index.html --out-dir dist/client",
	"build:server": "rollup -c",
	prebuild: "rm -rf dist",
	build: "npm run build:client && npm run build:server",
	"build:start": "npm run build && npm start",
	dev: "npm run dev:server & npm run dev:client",
	sandbox: "nodemon --watch ./client --exec babel-node ./client/state/demo.js"
};
var author = "";
var license = "ISC";
var dependencies = {
	"app-root-path": "^2.0.1",
	"body-parser": "^1.18.3",
	compression: "^1.7.2",
	"env-autoload": "^1.0.1",
	express: "^4.16.3",
	"react-transition-group": "^2.3.1"
};
var devDependencies = {
	axios: "^0.18.0",
	"babel-cli": "^6.26.0",
	"babel-eslint": "^8.2.3",
	"babel-plugin-transform-class-properties": "^6.24.1",
	"babel-plugin-transform-function-bind": "^6.22.0",
	"babel-plugin-transform-object-rest-spread": "^6.26.0",
	"babel-plugin-transform-runtime": "^6.23.0",
	"babel-preset-env": "^1.7.0",
	"babel-preset-react": "^6.24.1",
	history: "^4.7.2",
	"humanize-duration": "^3.15.0",
	immutable: "^3.8.2",
	less: "^3.0.4",
	"node-sass": "^4.9.0",
	nodemon: "^1.17.5",
	parcel: "^1.9.0",
	"prop-types": "^15.6.1",
	react: ">=15.0.0",
	"react-dom": ">=15.0.0",
	"react-hot-loader": "^4.3.2",
	"react-redux": "^5.0.7",
	"react-router-dom": "^4.3.1",
	"react-router-transition": "^1.2.1",
	"react-wrappers": "^1.0.0",
	redux: "^4.0.0",
	"redux-automap": "^1.3.1",
	"redux-immutable": "^4.0.0",
	"redux-saga": "^0.16.0",
	reselect: "^3.0.1",
	rollup: "^0.60.7",
	"rollup-plugin-babel": "^3.0.4",
	"rollup-plugin-commonjs": "^9.1.3",
	"rollup-plugin-eslint": "^4.0.0",
	"rollup-plugin-json": "^3.0.0",
	"rollup-plugin-node-resolve": "^3.3.0",
	"rollup-plugin-replace": "^2.0.0",
	"semantic-ui-css": "^2.3.1",
	"semantic-ui-react": "^0.81.1"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	author: author,
	license: license,
	dependencies: dependencies,
	devDependencies: devDependencies
};

// load .env using dotenv first
require('env-autoload');

// instantiate express
var app = express();
var PRODUCTION = "production" === 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

// static serving from /dist/client
app.use(express.static(APP_ROOT + '/dist/client'));

// example API entry
app.get('/test', function (req, res) {
  return res.json({
    foo: 'bar',
    mode: "production",
    port: process.env.PORT,
    test: process.env.TEST,
    production: PRODUCTION
  });
});

// json import support
app.get('/package.json', function (req, res) {
  return setTimeout(function () {
    var chance = Math.random() > 0.4;
    chance && res.json(pkg) || res.status(403).send();
  }, 1000);
});

var serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log('Express server @ http://localhost:' + serverPort + ' (' + ('production') + ')\n');
