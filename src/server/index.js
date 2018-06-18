// include other main deps
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
// const pkg = require('../package.json')

// load .env using dotenv first
require('env-autoload')

// instantiate express
const app = express()
const PRODUCTION = process.env.NODE_ENV === 'production'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

// static serving from /dist/client
const staticPath = path.join(__dirname, '../dist/client')
console.log(`serving static content from ${staticPath}`)
app.use(express.static(staticPath))
// app.use('/client', express.static(staticPath))

// example API entry
app.get('/test', (req, res) =>
  res.json({
    foo: 'bar',
    mode: process.env.NODE_ENV,
    port: process.env.PORT,
    test: process.env.TEST,
    production: PRODUCTION,
  })
)

// json import support
app.get('/package.json',
  (req, res) => setTimeout(() => {
    fs.readFile(
      path.join(__dirname, '../package.json'),
      'utf8',
      (err, data) => {
        if (err) throw err

        const pkg = JSON.parse(data)
        const chance = Math.random() > 0.4

        return (chance && res.json(pkg)) || res.status(403).send()
      }
    )
  }, 1000)
)

const serverPort = process.env.PORT || 3000
app.listen(serverPort)
console.log(`Express server @ http://localhost:${serverPort} (${PRODUCTION ? 'production' : 'development'})\n`)
