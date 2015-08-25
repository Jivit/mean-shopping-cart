var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var gutil = require('gulp-util');
var rev = require('gulp-rev');

gulp.task('html', function () {
  return gulp.src('public/views/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('concatScripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gzip())
    .pipe(rev())
    .pipe(gulp.dest('dist'))
})

gulp.task('concatCss', function () {
  return gulp.src('public/stylesheets/style.css')
    .pipe(gzip())
    .pipe(rev())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['html', 'concatScripts', 'concatCss'])
