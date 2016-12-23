var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    task = require('./build/build');

//js合并任务
gulp.task('view', function(callbck) {
    console.log('vuew: ', callback);
    task.view(callback);
});

//sass编译合并任务
gulp.task('controller', function(callback) {
    console.log('controller: ', callback);
    task.controller(callback);
});


//默认任务：命令 - gulp [default]
gulp.task('default', function() {
    //监听js
    gulp.watch(['src/views/*.*', 'src/sass/*.*', 'src/index.html'], ['view']);
    //监听sass
    gulp.watch(['src/controller/*.*'], ['controller']);

    task.view();
    // task.controller();
});