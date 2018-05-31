'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dotenv = _interopDefault(require('dotenv'));
var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var compression = _interopDefault(require('compression'));
var APP_ROOT = _interopDefault(require('app-root-path'));

dotenv.config({ silent: true });

var name = "parcel-test";
var version = "1.0.0";
var description = "testing parcel build process with react, sass, express";
var main = "dist/index.js";
var scripts = {
	start: "node dist/index.js",
	test: "echo \"Error: no test specified\" && exit 1",
	"dev:client": "parcel watch client/index.html --out-dir dist/client",
	"dev:server": "nodemon --watch ./server --exec babel-node ./server/index.js",
	"build:client": "parcel build client/index.html --out-dir dist/client",
	"build:server": "rollup -c",
	prebuild: "rm -rf dist",
	build: "npm run build:client && npm run build:server",
	"build:start": "npm run build && npm start",
	dev: "npm run dev:server & npm run dev:client"
};
var author = "";
var license = "ISC";
var dependencies = {
	"app-root-path": "^2.0.1",
	"body-parser": "^1.18.3",
	compression: "^1.7.2",
	dotenv: "^5.0.1",
	express: "^4.16.3"
};
var devDependencies = {
	"babel-cli": "^6.26.0",
	"babel-eslint": "^8.2.3",
	"babel-plugin-transform-class-properties": "^6.24.1",
	"babel-plugin-transform-object-rest-spread": "^6.26.0",
	"babel-plugin-transform-runtime": "^6.23.0",
	"babel-preset-env": "^1.7.0",
	"babel-preset-react": "^6.24.1",
	"node-sass": "^4.9.0",
	nodemon: "^1.17.5",
	parcel: "^1.8.1",
	react: "^16.4.0",
	"react-dom": "^16.4.0",
	"react-hot-loader": "^4.2.0",
	rollup: "^0.59.4",
	"rollup-plugin-babel": "^3.0.4",
	"rollup-plugin-commonjs": "^9.1.3",
	"rollup-plugin-json": "^3.0.0",
	"rollup-plugin-node-resolve": "^3.3.0",
	"rollup-plugin-replace": "^2.0.0"
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
    production: PRODUCTION
  });
});

// json import support
app.get('/package.json', function (req, res) {
  return res.json(pkg);
});

var serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log('Express server @ http://localhost:' + serverPort + ' (' + ('production') + ')\n');
