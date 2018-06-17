const { src, task, exec, context } = require('fuse-box/sparky')
const {
  FuseBox,
  BabelPlugin,
  HTMLPlugin,
  JSONPlugin,
  CSSPlugin,
  CSSModules,
  CSSResourcePlugin,
  SassPlugin,
  LESSPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin,
  Sparky
} = require('fuse-box')

const isProduction = process.argv.slice(2).pop() === 'build'
if (isProduction) {
  console.log('BUILDING PRODUCTION MODE')
}

const clientConfig = {
  homeDir: 'src',
  output: 'dist/$name.js',
  hash: isProduction,
  debug: !isProduction,
  sourceMaps: true,
  // useJsNext: ['semantic-ui-react'],
  // polyfillNonStandardDefaultUsage: true,
  plugins: [
    BabelPlugin({
      config: {
        sourceMaps: !isProduction,
        presets: [ 'env', 'react' ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
          'transform-function-bind',
          'transform-runtime'
        ],
      },
    }),
    [
      SassPlugin(),
      CSSPlugin()
    ],
    [
      LESSPlugin(),
      CSSPlugin()
    ],
    [
      // 'node_modules.**css',
      CSSResourcePlugin({
        dist: 'dist/assets',
        resolve: (f) => `/assets/${f}`
      }),
      CSSPlugin()
    ],
    CSSPlugin(),
    WebIndexPlugin({
      title: 'Fuse Box Demo',
      target: 'index.html',
      template: 'static/index.html',
      bundles: ['app', 'vendor']
    }),
    isProduction && QuantumPlugin({
      manifest : true,
      target: 'browser',
      replaceTypeOf: false,
      // treeshake: true,
      uglify: true,
      // treeshake : true,
      bakeApiIntoBundle: true,
      css: {
        clean: true
      }
    })
  ]
}

const serverConfig = {
  homeDir: 'src',
  output: 'dist/$name.js',
  debug: !isProduction,
  sourceMaps: true,
  plugins: [
    BabelPlugin({
      config: {
        sourceMaps: true,
        presets: [ 'env', 'react' ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
          'transform-function-bind',
          'transform-runtime'
        ],
      },
    })
  ]
}

task('default', async context => {
  await src('./dist')
      .clean('dist/')
      .exec()

  const client = FuseBox.init(clientConfig)
  const server = FuseBox.init(serverConfig)
  client.dev({ port: 4445, httpServer: false })

  client
    .bundle('app')
    .instructions(' > client/index.js')
    .watch('src/client/**')
    .hmr()

  server
    .bundle('server')
    .instructions(' > [server/index.js]')
    .plugin(JSONPlugin())
    .watch('src/server/**')
    .completed(proc => proc.start())

  client.run()
  server.run()
})

task('build', async context => {
  await src('./dist')
      .clean('dist/')
      .exec()

  const client = FuseBox.init(clientConfig)
  const server = FuseBox.init(serverConfig)

  client
    .bundle('vendor')
    .instructions('~ client/index.js')

  client
    .bundle('app')
    .instructions('!> [client/index.js]')


  server
    .bundle('server')
    .instructions(' > [server/index.js]')
    .plugin(JSONPlugin())

  client.run()
  server.run()
})
