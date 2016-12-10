var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var cssnano = require('gulp-cssnano');



gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function() {
  return sass('src/styles/*.scss', { style: 'compressed' })
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', function() {
    gulp.start('scripts', 'styles');
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/styles/*.scss', ['styles']);
});