'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var compression = _interopDefault(require('compression'));
var path = _interopDefault(require('path'));

var app = express();
var PRODUCTION = "production" === 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

var staticPath = path.join(__dirname, '../dist');
console.log('Serving static files from ' + staticPath);

app.get('/server.js', function (req, res) {
  res.status(403).send();
});

app.use(express.static(staticPath));

app.get('/test', function (req, res) {
  return res.json({
    foo: 'baz',
    mode: "production",
    production: PRODUCTION
  });
});

var serverPort = process.env.PORT || 3000;
console.log('Express server listening on port ' + serverPort);
app.listen(serverPort);
