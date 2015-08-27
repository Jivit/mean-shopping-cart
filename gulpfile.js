var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var minifycss = require('gulp-minify-css');
var fingerprint = require('gulp-fingerprint');


gulp.task('html', function () {
  return gulp.src('public/views/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gzip())
    .pipe(rev())
    .pipe(gulp.dest('dist'))
})
// gulp.task('js', function () {
//   return gulp.src('js/*js')
//     .pipe(concat('all.js'))
//     .pipe(uglify())
//     .pipe(rev.manifest('./'))
//     .pipe(fingerprint())
//     .pipe(gulp.dest('dist'))
//     .pipe(revNapkin());
// })
gulp.task('css', function () {
  return gulp.src('public/stylesheets/*.css')
    .pipe(minifycss())
    .pipe(gzip())
    .pipe(rev())
    .pipe(gulp.dest('dist'))
})

gulp.task('watchout', function () {
  gulp.watch('public/javascripts/*.js', ['scripts'])
  gulp.watch('public/stylesheets/*.css', ['css'])
  gulp.watch('public/views/index.html', ['html'])
})


gulp.task('default', ['html', 'scripts', 'css', 'watchout' ])
