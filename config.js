const ENTRYPOINT = 'main.js';

const CONFIG = {
  'js': {
    'src' : './src/js/*.js',
    'fullAppPath' : './src/js/' + ENTRYPOINT,
    'appName' : ENTRYPOINT
  },
  'scss' : {
    'src' : './src/scss/*.scss'
  },
  'publicPath' : './public/',
  'build' : {
    'js': './build/js',
    'css': './build/css'
  }
}

export default CONFIG