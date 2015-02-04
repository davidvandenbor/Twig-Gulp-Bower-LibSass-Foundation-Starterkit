var gulp = require('gulp');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
//var prettify = require('gulp-html-prettify');
//var uglify = require('gulp-uglify');
var open = require("gulp-open");
var ssg = require('gulp-ssg');
var connect = require('gulp-connect');
var port = process.env.port || 3031;


// variables for ssg function
var website = {
  titel: 'My site'
}; // end variables for ssg


gulp.task('scripts', function() {
  gulp.src(['./src/js/analytics.js', './src/js/app.js'])
      .pipe(concat('app.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('compile', function () {
  'use strict';
  var twig = require('gulp-twig');
  return gulp.src(['./src/templates/**/*.twig', '!**/templates/**/_*.twig'])
      //.pipe(plumber())
      .pipe(twig())
      .pipe(ssg(website))
      //.pipe(prettify({
      //  indent_char: ' ',
      //  indent_size: 1
      //}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return gulp.src(['./src/scss/*.scss', '!./src/scss/_*.scss'])
    //.pipe(plumber())
    //.pipe(sass({ outputStyle: 'compressed' }))
    //  .pipe(sass({sourcemap: true, outputStyle: 'compact'}))
      .pipe(sass({sourcemap: false, outputStyle: 'compressed'}))
      .pipe(autoprefixer())
      //.pipe(autoprefixer())
    .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('assets', function() {
  return gulp.src('./src/assets/**/*')
    //.pipe(plumber())
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('open', function() {
  gulp.src('./dist/index.html')
    .pipe(open('', {
      url: 'http://localhost:' + port
    }));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: port,
    livereload: true
  });
});

// live reload css
gulp.task('reload:css', function() {
  gulp.src('./dist/assets/**/*.css')
    .pipe(connect.reload());
});

// live reload js
gulp.task('reload:js', function() {
  gulp.src('./dist/assets/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('reload:html', function() {
  gulp.src('./dist/**/*.html')
    .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
  gulp.watch('./dist/assets/**/*.css', ['reload:css']);
  gulp.watch('./dist/assets/js/app.js', ['reload:js']);
  gulp.watch('./dist/**/*.html', ['reload:html']);
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch(['./src/**/*.twig'], ['compile']);
  gulp.watch('./src/js/app.js', ['scripts']);
});

gulp.task('build', [
  'sass',
  'assets',
  'compile',
  'scripts'
]);

gulp.task('serve', [
  'build',
  'connect',
  'open',
  'watch'
]);

gulp.task('default', ['serve']);
