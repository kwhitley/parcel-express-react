import {} from './env';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import pkg from '../package.json';
import APP_ROOT from 'app-root-path';

const app = express();
const PRODUCTION = process.env.NODE_ENV === 'production';

const envClean = (env) =>
  Object
    .keys(env)
    .filter(k => !k.startsWith('npm_'))
    .reduce((a, k) => {
      a[k] = env[k];

      return a;
    }, {})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

// static serving from /dist/client
const staticPath = APP_ROOT + '/dist/client';
app.use(express.static(staticPath));
console.log(`Serving static files from ${staticPath}`);

// example API entry
app.get('/test', (req, res) => res.json({
  foo: 'bar',
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  env: envClean(process.env),
  production: PRODUCTION
}));

// json import support
app.get('/package.json', (req, res) => res.json(pkg));


const serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log(`Express server @ http://localhost:${serverPort} (${PRODUCTION ? 'production' : 'development'})\n`);
