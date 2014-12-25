/*
    Gulp
*/
var 
    gulp = require('gulp'),
    mocha = require('gulp-mocha')
    gutil = require('gulp-util');


// coding gulpfile
gulp.task('watch-gulp', function () {
    gulp.watch('./gulpfile.js', function () {
        console.log('watch-gulp was fired');
    });
});


// coding mocha
gulp.task('mocha', function () {
    return gulp.src('./002_mocha/**/*.js')
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});
gulp.task('watch-mocha', function () {
    gulp.watch('./002_mocha/**/*.js', ['mocha']);
});


