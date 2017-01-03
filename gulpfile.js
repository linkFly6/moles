var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    task = require('./build/build');

//js合并任务
gulp.task('view', function(callback) {
    task.view(callback);
});

//sass编译合并任务
gulp.task('controller', function(callback) {
    task.controller(callback);
});

//默认任务：命令 - gulp [default]
gulp.task('default', function() {
    //监听js
    gulp.watch(['src/**/*.*'/*, 'src/sass/*.*', 'src/index.html'*/], ['view']);
    gulp.watch(['fonts/*.scss', 'fonts/*.css'], ['view']);
    //监听sass
    // gulp.watch(['src/controller/*.*'], ['controller']);
    // task.view();
    // task.controller();
});