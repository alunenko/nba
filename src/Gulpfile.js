var gulp       = require('gulp')
  , uglify     = require('gulp-uglify')
  , concat     = require('gulp-concat')
  , babel      = require('gulp-babel')
  , jade       = require('gulp-jade')
  , stylus     = require('gulp-stylus')
  , connect    = require('gulp-connect')
  , open       = require('gulp-open')
  , livereload = require('gulp-livereload')
  , bower      = require('gulp-bower');

var env = process.env.NODE_ENV || 'development';
var outputPath = 'builds/' + env;

gulp.task('jade', function() {
  return gulp.src( 'templates/**/*.jade' )
    .pipe( jade({
      pretty: env === 'development'
    }) )
    .pipe( gulp.dest('../' + outputPath) )
    .pipe( livereload() );
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('bootstrap', function() {
  return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe( gulp.dest('../' + outputPath + '/vendor/bootstrap/css') )
    .pipe( livereload() );
});

gulp.task('watch', function() {
  livereload.listen();
  //gulp.watch( 'css/**/*.styl', ['css'] );
  //gulp.watch( 'js/**/*.js', ['js'] );
  gulp.watch( ['templates/**/*.jade'], ['jade'] );
});

gulp.task('connect', function() {
  connect.server({
    root: ['../' + outputPath],
    port: 3000,
    livereload: true
  })
});

gulp.task('open', function() {
  return gulp.src('')
    .pipe( open({
      app: 'chrome',
      uri: 'http://localhost:3000/index.html'
    }) );
});

gulp.task('default', ['bower', 'jade', 'connect', 'open', 'bootstrap', 'watch']);
