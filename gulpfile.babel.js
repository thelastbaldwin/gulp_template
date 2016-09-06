import gulp from'gulp';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import config from './config.js';
const browerSyncServer = browserSync.create();


// bundle together js files into a single main.js file
gulp.task('bundle', ['eslint'], ()=>{
  const bundler = browserify(config.js.app);

  bundler.transform(babelify);
  bundler.bundle()
    .on('error', (err)=>{
      console.log(err);
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build/js'));
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
    .pipe(gulp.dest('build/css'));
});

gulp.task('serve', ()=>{
  browerSyncServer.init({
    server: {
      baseDir: 'public'
    }
  });
});


// run jshint whenever a js file is updated
// compile sass assets when any scss files are updated
// refresh the browswer whenever a relevant file changes
gulp.task('watch', ()=>{
  gulp.watch(config.js.src, ['bundle']);
  gulp.watch(config.scss.src, ['build-css']);
  gulp.watch('public/**').on('change', browserSync.reload);
});

gulp.task('default', ['build-css', 'bundle', 'serve', 'watch']);
