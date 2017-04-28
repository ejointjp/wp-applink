/////////////////////////////////////////////////////////////////////////////////////

// requirement

/////////////////////////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var del = require('del');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

/////////////////////////////////////////////////////////////////////////////////////

// config

/////////////////////////////////////////////////////////////////////////////////////

var config = require('./_config');
var dir = config.dir;
var file = config.file;

/////////////////////////////////////////////////////////////////////////////////////

// tasks

/////////////////////////////////////////////////////////////////////////////////////

// clean assets file
gulp.task('clean', function(){

  var assets = path.join(dir.rel.dist, dir.assets, dir.all, file.all);
  var caches = path.join(dir.rel.dist, 'cache', file.all);
  var deleteFiles = [assets];

  if(argv.cache){
    var deleteFiles = [caches];
  }

  if(argv.all){
    var deleteFiles = [assets, caches];
  }

  console.log('Deleted files: ' + deleteFiles);
  del(deleteFiles);
});

gulp.task('build', function(){
  var src = path.join(dir.rel.src, dir.sass, 'wp-applink.scss');
  var dist = path.join(dir.rel.dist, dir.assets, dir.sass)

  gulp.src(src)
    .pipe(gulp.dest(dist));
});
