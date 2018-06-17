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

context({
  getConfig({ isProduction = false, isClient = true }) {
    console.log(`creating context, isClient:${isClient}, isProduction:${isProduction}`)
    return FuseBox.init({
      homeDir: 'src',
      target: 'browser@es5',
      output: 'dist/$name.js',
      sourceMaps: !isProduction,
      debug: isProduction,
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
          // target: 'index.html',
          template: 'static/index.html',
          bundles: ['app']
        }),
        this.isProduction && !isServer && QuantumPlugin({
          uglify: true,
          treeshake : true,
          bakeApiIntoBundle: 'app',
          css: {
            clean: true
          }
        })
      ]
    })
  }
})

task('default', async context => {
    await src('./dist')
      .clean('dist/')
      .exec()

    // client
    const client = context.getConfig({})

    client.bundle('app')
        .watch('src/client/**')
        .instructions(' > client/index.js')
        .hmr()

    await client.run()

    // server
    const server = context.getConfig({ isClient: false })

    server.bundle('server')
        .watch('src/server/**')
        .instructions(' > [server/index.js]')
        .completed(proc => proc.start())

    await server.run()
})

task('build', async context => {
    await src('./dist')
      .clean('dist/')
      .exec()

    const server = context.getConfig({})

    server
      .bundle('server')
      .instructions(' > [server/index.js]')

    await server.run()

    // set to production for client generation
    context.isProduction = true
    context.isClient = true

    // client
    const client = context.getConfig({})

    client.bundle('app')
        .instructions(' > client/index.js')

    await client.run()
})

// const fuse = FuseBox.init({
//   homeDir: 'src',
//   output: 'dist/$name.js',
//   // hash: isProduction,
//   debug: !isProduction,
//   plugins: [
//     BabelPlugin({
//       config: {
//         sourceMaps: !isProduction,
//         presets: [ 'env', 'react' ],
//         plugins: [
//           'transform-class-properties',
//           'transform-object-rest-spread',
//           'transform-function-bind',
//           'transform-runtime'
//         ],
//       },
//     }),
//     [
//       SassPlugin(),
//       CSSPlugin({
//         group: 'styles.css',
//         outFile: 'dist/client/styles.css'
//       })
//     ],
//     [
//       LESSPlugin(),
//       CSSPlugin()
//     ],
//     [
//       // 'node_modules.**css',
//       CSSResourcePlugin({
//           dist: 'dist/client/assets',
//           resolve: (f) => `/assets/${f}`
//       }),
//       CSSPlugin({
//         group: 'assets.css',
//         outFile: 'dist/client/assets.css'
//       })
//     ],
//     CSSPlugin({
//       group: 'app.css',
//       outFile: 'dist/client/app.css'
//     }),
//     WebIndexPlugin({
//       title: 'Fuse Box Demo',
//       target: 'client/index.html',
//       template: 'static/index.html',
//       bundles: ['client/vendor', 'client/app', ]
//     })
//     // isProduction && UglifyJSPlugin()
//   ]
// })

// fuse.dev({ port: 4445, httpServer: false })

// fuse
//   .bundle('client/vendor')
//   .target('browser')
//   .instructions('~ client/index.js')
//   .plugin(isProduction && QuantumPlugin({
//     uglify: true,
//     treeshake : true
//   }))

// const appBundle = fuse
//                     .bundle('client/app')
//                     .target('browser')
//                     .plugin(isProduction && QuantumPlugin({
//                       uglify: true,
//                       treeshake : true
//                     }))
//   // .plugin(
//   //   isProduction && CSSModules(),
//   //   isProduction && CSSPlugin({
//   //     group: 'app.css',
//   //     outFile: 'dist/app.css'
//   //   })
//   // )

//   if (!isProduction) {
//     appBundle
//       .watch('client/**')
//       .hmr()
//   }

//   appBundle.instructions('!> [client/index.js]')

// const serverBundle = fuse.bundle('server')
//     .watch('server/**') // watch only server related code.. bugs up atm
//     .instructions(' > [server/index.js]')
//     .plugin(JSONPlugin())
//     // Execute process right after bundling is completed
//     // launch and restart express

// if (!isProduction) {
//   serverBundle
//     .completed(proc => proc.start())
// }

// // fuse.bundle('client/app')
// //     .target('browser')
// //     .plugin(
// //       isProduction && CSSModules(),
// //       isProduction && CSSPlugin({
// //         group: 'app.css',
// //         outFile: 'dist/app.css'
// //       })
// //     )
// //     .watch('client/**') // watch only client related code
// //     .hmr()
// //     .instructions(' > client/index.js')


// fuse.run()
