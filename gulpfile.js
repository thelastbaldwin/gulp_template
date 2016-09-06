const gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

// transpile from ES6 to ES5
gulp.task('babel', function(){
  return gulp.src('src/**/*/js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build/js'));
});

// run jshint on all javascript files
gulp.task('eslint', function(){
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// compile sass assets into vanilla css
gulp.task('build-css', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// run jshint whenever a js file is updated
// compile sass assets when any scss files are updated
// refresh the browswer whenever a relevant file changes
gulp.task('watch', function(){
  browserSync.init({
    server: 'public'
  });

  gulp.watch('src/**/*.js', ['eslint']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
  gulp.watch('build/**').on('change', browserSync.reload);
});

gulp.task('default', ['watch']); 
