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
        presets: [ 'env', 'react' ],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread',
          'transform-function-bind',
          'transform-runtime'
        ],
      },
    }),
    [SassPlugin(), CSSPlugin()],
    [LESSPlugin(), CSSPlugin()],
    [
      // 'node_modules.**css',
      CSSResourcePlugin({
          dist: 'dist/client/assets',
          resolve: (f) => `/assets/${f}`
      }),
      CSSPlugin({
        group: 'app.css',
        outFile: `dist/client/app.css`
      })
    ],
    WebIndexPlugin({
      title: 'Fuse Box Demo',
      target: 'client/index.html',
      template: 'static/index.html',
      bundles: ['client/vendor', 'client/app', ]
    }),
    isProduction && QuantumPlugin(),
    isProduction && UglifyJSPlugin()
  ]
})

fuse.dev({ port: 4445, httpServer: false })

fuse
  .bundle('client/vendor')
  .target('browser')
  .instructions('~ client/index.js')

fuse
  .bundle('client/app')
  .target('browser')
  // .plugin(
  //   isProduction && CSSModules(),
  //   isProduction && CSSPlugin({
  //     group: 'app.css',
  //     outFile: 'dist/app.css'
  //   })
  // )
  .watch('client/**')
  .hmr()
  .instructions('!> [client/index.js]')

fuse.bundle('server')
    .watch('server/**') // watch only server related code.. bugs up atm
    .instructions(' > [server/index.js]')
    .plugin(JSONPlugin())
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())

// fuse.bundle('client/app')
//     .target('browser')
//     .plugin(
//       isProduction && CSSModules(),
//       isProduction && CSSPlugin({
//         group: 'app.css',
//         outFile: 'dist/app.css'
//       })
//     )
//     .watch('client/**') // watch only client related code
//     .hmr()
//     .instructions(' > client/index.js')


fuse.run()
