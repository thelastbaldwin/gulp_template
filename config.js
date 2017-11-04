const ENTRYPOINT = 'main.js';

const CONFIG = {
  src: "./src",
  js: {
    src : './src/js/*.js',
    fullAppPath : './src/js/' + ENTRYPOINT,
    appName : ENTRYPOINT
  },
  scss : {
    src : './src/scss/*.scss'
  },
  nodeModules: './node_modules',
  publicPath : './public/',
  build : {
    js: './build/js',
    css: './build/css'
  }
}

export default CONFIG