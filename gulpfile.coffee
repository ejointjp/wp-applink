$ = require('gulp-load-plugins')()
gulp = require 'gulp'

# Config ######################

dir =
  src: 'src'
  release: 'wp-applink'

path =
  sass: dir.src + '/_sass'
  cssSrc: dir.src + '/_css'
  jsSrc: dir.src + '/_js'
  css: dir.release + '/css'
  js: dir.release + '/js'

sassOptions =
  style: 'expanded'
  require: ['bourbon']
  sourcemap: false

pleeeseOptions =
  autoprefixer:
    browsers: ['last 2 versions', 'android 4.1']
  minifier: false
  sourcemaps: false
  sass: false
  mqpacker: true


# Tasks #######################


gulp.task 'sass', ->
  $.rubySass path.sass + '/**/*.scss', sassOptions
    .pipe $.cached 'sass'
    .pipe $.pleeease pleeeseOptions
    .pipe gulp.dest path.cssSrc
    .pipe gulp.dest path.css
    .pipe $.pleeease {minifier: true}
    .pipe $.rename {suffix: '.min'}
    .pipe gulp.dest path.css


# JS
gulp.task 'js', ->
  gulp.src path.jsSrc + '/*.js'
    .pipe $.cached 'js'
    .pipe gulp.dest path.js
    .pipe $.uglify()
    .pipe $.rename {suffix: '.min'}
    .pipe gulp.dest path.js

# Build
gulp.task 'build', ['sass', 'js']

#Watch
gulp.task 'default', ->
  gulp.watch path.sass + '/**/*.scss', ['sass']
  gulp.watch path.jsSrc + '/*.js', ['js']
