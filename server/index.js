import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';

const app = express();
const PRODUCTION = process.env.NODE_ENV === 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

const staticPath = PRODUCTION ? path.join(__dirname, '../dist') : __dirname;
console.log(`Serving static files from ${staticPath}`)

app.get('/server.js', (req, res) => {
  res.status(403).send();
});

app.use(express.static(staticPath));

app.get('/test', (req, res) => res.json({
  foo: 'bar',
  mode: process.env.NODE_ENV,
  production: PRODUCTION
}));

const serverPort = process.env.PORT || 3000;
console.log(`Express server listening on port ${serverPort}`);
app.listen(serverPort);
