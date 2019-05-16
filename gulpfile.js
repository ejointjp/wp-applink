const gulp = require('gulp')
const path = require('path')

const config = require('./config')
const dir = config.dir
const src = {
  stylus: [
    path.resolve(dir.src, 'stylus', '**', '*.styl')
  ],
  js: [
    path.resolve(dir.dest, 'js', '**', '*.js')
  ],
  css: [
    path.resolve(dir.dest, 'css', '**', '*.css')
  ]
}
const dist = {
  stylus: path.resolve(__dirname, dir.dist, 'stylus'),
  js: path.resolve(__dirname, dir.dist, 'js'),
  css: path.resolve(__dirname, dir.dist, 'css')
}

gulp.task('copy', function (cb) {
  const items = ['stylus', 'js', 'css']

  items.forEach(function (item) {
    gulp
      .src(src[item])
      .pipe(gulp.dest(dist[item]))
  })
  cb()
})
