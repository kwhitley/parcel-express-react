const {
  FuseBox,
  BabelPlugin,
  HTMLPlugin,
  JSONPlugin,
  CSSPlugin,
  SassPlugin,
  LESSPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin,
  Sparky
} = require('fuse-box')

const isProduction = process.argv.slice(2).pop() === 'production'
if (isProduction) {
  console.log('BUILDING PRODUCTION MODE')
}

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  plugins: [
    BabelPlugin({
      config: {
        sourceMaps: true,
        presets: [ "env", "react" ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
          'transform-function-bind'
        ],
      },
    }),
    JSONPlugin(),
    [SassPlugin(), CSSPlugin()],
    [LESSPlugin(), CSSPlugin()],
    CSSPlugin(),
    WebIndexPlugin({
      title: 'Fuse Box Demo',
      target: 'client/index.html',
      template: 'static/index.html',
      bundles: ['client/app']
    }),
    isProduction && QuantumPlugin(),
    isProduction && UglifyJSPlugin()
  ]
})

fuse.dev({ port: 4445, httpServer: false })

fuse.bundle('server')
    .watch('server/**') // watch only server related code.. bugs up atm
    .instructions(' > [server/index.js]')
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())


fuse.bundle('client/app')
    .target('browser')
    .watch('client/**') // watch only client related code
    .hmr()
    .instructions(' > client/test.js')


fuse.run()
