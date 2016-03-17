var gulp    = require('gulp')
  , uglify  = require('gulp-uglify')
  , concat  = require('gulp-concat')
  , babel   = require('gulp-babel')
  , jade    = require('gulp-jade')
  , stylus  = require('gulp-stylus')
  , connect = require('gulp-connect')
  , open    = require('gulp-open');

var env = process.env.NODE_ENV || 'development';

var outputPath = 'builds/' + env;

gulp.task('jade', function() {
  return gulp.src( 'templates/**/*.jade' )
    .pipe( jade({
      pretty: env === 'development'
    }) )
    .pipe( gulp.dest('../' + outputPath) )
    .pipe( connect.reload() );
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

gulp.task('default', ['jade', 'connect', 'open']);
