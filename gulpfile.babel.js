import gulp from'gulp';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import config from './config.js';
const browserSyncServer = browserSync.create();


// bundle together js files into a single main.js file
gulp.task('bundle-js', ['eslint'], ()=>{
  const bundler = browserify(config.js.app);

  bundler.transform('babelify',
    { presets: [ 'es2015', 'react' ]
  });
  bundler.bundle()
    .on('error', (err)=>{
      console.log(err);
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.publicPath + 'js/'));
});


// run jshint on all javascript files
gulp.task('eslint', ()=>{
  return gulp.src(config.js.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// compile sass assets into vanilla css
gulp.task('build-css', ()=>{
  return gulp.src(config.scss.src)
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(gulp.dest(config.publicPath + 'css/'))
    .pipe(browserSyncServer.stream());
});

gulp.task('serve', ()=>{
  browserSyncServer.init({
    server: {
      baseDir: config.publicPath
    }
  });
});

gulp.task('build', ()=>{
  //lint js
  //compile sass
  //compress css
  //build js
});


// run jshint whenever a js file is updated
// compile sass assets when any scss files are updated
// refresh the browswer whenever a relevant file changes
gulp.task('watch', ()=>{
  gulp.watch(config.js.src, ['bundle-js'], browserSyncServer.reload);
  gulp.watch(config.scss.src, ['build-css']);
  gulp.watch(config.publicPath + '*').on('change', browserSyncServer.reload);
});

gulp.task('default', ['build-css', 'bundle-js', 'serve', 'watch']);
