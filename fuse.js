const { src, task, exec, context } = require('fuse-box/sparky')
const {
  FuseBox,
  BabelPlugin,
  JSONPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  SassPlugin,
  LESSPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin
} = require('fuse-box')

const clientConfig = isProduction => ({
  homeDir: 'src',
  output: 'dist/$name.js',
  hash: isProduction,
  debug: !isProduction,
  sourceMaps: true,
  // useJsNext: ['semantic-ui-react'],
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
      bakeApiIntoBundle: true,
      css: {
        clean: true
      }
    })
  ]
})

const serverConfig = {
  homeDir: 'src',
  output: 'dist/$name.js',
  debug: true,
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
    }),
    JSONPlugin(),
  ]
}

task('default', async context => {
  await src('./dist')
      .clean('dist/')
      .exec()

  const client = FuseBox.init(clientConfig(false))
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
    .watch('src/server/**')
    .completed(proc => proc.start())

  client.run()
  server.run()
})

task('build', async context => {
  await src('./dist')
      .clean('dist/')
      .exec()

  const client = FuseBox.init(clientConfig(true))
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

  client.run()
  server.run()
})
