# Parcel.js + ExpressJS + ReactJS
a simple boilerplate to bootstrap a server+client project

---

### Why?
In short, Webpack Fatique.  While webpack is supremely configurable, it's something of a nightmare to setup, and many basic assumptions (like babel support, jsx if using ReactJS, images, less/sass compiling, etc) are not included by default.  Each has to be researched, included, and configured.  If you want to build a server+client in a single app, this complexity explodes even further.  [Parcel.js](https://www.npmjs.com/package/parcel) touts a blazing fast "zero-config" setup, and has been confirmed by this project to do just that, while supporting many of these complexities out of the box.

### Structure
- `/client` - throw your entire untranspiled client code+assets in here (entry point is index.html)
- `/server` - throw your entire untranspiled server code here (entry point is index.js)
- `/dist` - generated output using the `npm run build` or `npm run dev` commands
- `.env` (root) - local environment variables will be automatically loaded
- `rollup.config.js` - in case you have specific server-side build complexities, modify this

### Supports (out of the box)
- [x] React/JSX
- [x] Hot Reloading
- [x] CSS/LESS/SASS
- [x] Images
- [x] Autoreloading of server & client while in `npm run dev` mode
- [x] Sourcemaps (manual refresh required, as hot-reloading messes with sourcemaps)
- [x] Build to ES5
- [x] Cache-busting

### NPM Commands
The following NPM commands are included for convenience.

```bash
npm run dev         # runs client and server in watch mode @ http://localhost:3000
npm run build       # builds the server + client in production mode to /dist
npm start           # runs the built server from /dist/server.js (sourced from /server/index.js)

# shortcuts
npm run build:start # builds and runs start
```

