var gulp       = require('gulp')
  , uglify     = require('gulp-uglify')
  , concat     = require('gulp-concat')
  , babel      = require('gulp-babel')
  , jade       = require('gulp-jade')
  , stylus     = require('gulp-stylus')
  , connect    = require('gulp-connect')
  , open       = require('gulp-open')
  , livereload = require('gulp-livereload')
  , gulpif     = require('gulp-if');

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

gulp.task('babel', function() {
  return gulp.src('js/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('../_tmp/js'))
  .pipe( livereload() );
});

gulp.task('js', ['babel'], function() {
  gulp.src( '../_tmp/js/**/*.js' )
    .pipe( concat('all.min.js') )
    .pipe( gulpif(env === 'production', uglify()) )
    .pipe( gulp.dest('../' + outputPath + '/js') )
    .pipe( livereload() );
});

// move to the vendor
gulp.task('bootstrap', function() {
  return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe( gulp.dest('../' + outputPath + '/vendor/bootstrap/css') )
    .pipe( livereload() );
});

gulp.task('angular', function() {
  return gulp.src('bower_components/angular/angular.min.js')
    .pipe( gulp.dest('../' + outputPath + '/vendor/angular/js') )
    .pipe( livereload() );
});

gulp.task('watch', function() {
  livereload.listen();
  //gulp.watch( 'css/**/*.styl', ['css'] );
  gulp.watch( 'js/**/*.js', ['js'] );
  gulp.watch( ['templates/**/*.jade'], ['jade'] );
});

gulp.task('connect', function() {
  connect.server({
    root: ['../' + outputPath],
    port: 3000,
    livereload: true
  })
});

gulp.task('open', ['bootstrap', 'angular', 'jade', 'js', 'connect'], function() {
  return gulp.src('')
    .pipe( open({
      app: 'chrome',
      uri: 'http://localhost:3000/index.html'
    }) );
});

gulp.task('default', ['open', 'watch']);
