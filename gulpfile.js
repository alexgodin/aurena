var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-minify-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')
var ghPages      = require('gulp-gh-pages');

var Paths = {
  IMG                  : './img/**',
  FONTS                : './fonts/**',
  HERE                 : './',
  HTML                 : './*.html',
  TO_GH_PAGES          : './dist/**/**',
  DIST                 : 'dist',
  DIST_IMG             : 'dist/img',
  DIST_FONTS           : 'dist/fonts',
  DIST_TOOLKIT_JS      : 'dist/toolkit.js',
  LESS                 : './less/**/**',
  TOOLKIT_JS           : [
      './js/bootstrap/transition.js',
      './js/bootstrap/alert.js',
      './js/bootstrap/affix.js',
      './js/bootstrap/button.js',
      './js/bootstrap/carousel.js',
      './js/bootstrap/collapse.js',
      './js/bootstrap/dropdown.js',
      './js/bootstrap/modal.js',
      './js/bootstrap/tooltip.js',
      './js/bootstrap/popover.js',
      './js/bootstrap/scrollspy.js',
      './js/bootstrap/tab.js',
      './js/toolkit/*'
    ],
    CUSTOM_JS          : './js/custom/*'
}

gulp.task('default', ['less', 'js', 'html', 'img','fonts'])

gulp.task('watch', function () {
  gulp.watch(Paths.LESS, ['less']);
  gulp.watch(Paths.CUSTOM_JS,   ['toolkit-js']);
  gulp.watch(Paths.TOOLKIT_JS,   ['custom-js']);
  gulp.watch(Paths.HTML, ['html']);
  gulp.watch(Paths.IMG, ['img']);
})

//***************//
// MOVE ASSETS INTO DIST
//***************//

gulp.task('assets',['img','fonts','html'])

gulp.task('img', function (){
  return gulp.src(Paths.IMG)
  .pipe(gulp.dest(Paths.DIST_IMG))
})

gulp.task('fonts', function (){
  return gulp.src(Paths.FONTS)
  .pipe(gulp.dest(Paths.DIST_FONTS))
})

gulp.task('html', function () {
  return gulp.src(Paths.HTML)
    .pipe(gulp.dest(Paths.DIST))
})

//***************//
//DEAL WITH JS
//***************//

gulp.task('js', ['toolkit-js','custom-js'])

gulp.task('toolkit-js', function () {
  return gulp.src(Paths.TOOLKIT_JS)
  .pipe(concat('toolkit.js'))
  .pipe(gulp.dest(Paths.DIST))
})

gulp.task('custom-js', function () {
  return gulp.src(Paths.CUSTOM_JS)
    .pipe(concat('custom.js'))
    .pipe(gulp.dest(Paths.DIST))
})


//***************//
//DEAL WITH LESS
//***************//

gulp.task('less', function () {
  return gulp.src('./less/master.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Paths.DIST))
})


// gulp.task('less-min', ['less'], function () {
//   return gulp.src(Paths.LESS_TOOLKIT_SOURCES)
//     .pipe(sourcemaps.init())
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(autoprefixer())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(sourcemaps.write(Paths.HERE))
//     .pipe(gulp.dest(Paths.DIST))
// })

gulp.task('server', function () {
  connect.server({
    root: './dist',
    port: 9001,
    livereload: true
  })
})

// gulp.task('js-min', ['js'], function () {
//   return gulp.src(Paths.DIST_TOOLKIT_JS)
//     .pipe(uglify())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest(Paths.DIST))
// })

gulp.task('deploy',function() {
    return gulp.src(Paths.TO_GH_PAGES)
    .pipe(ghPages({force: true}));
})
