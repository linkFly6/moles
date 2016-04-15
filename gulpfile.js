var gulp = require('gulp'),
    concat = require('gulp-concat');


gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.src(['src/views/*.js', '!bundle.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('src/views/'));
});