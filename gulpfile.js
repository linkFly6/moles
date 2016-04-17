var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

//js合并任务
gulp.task('js-compressor', function () {
    gulp.src([
        'src/views/main.js',
        'src/views/index.js',
        'src/views/quickcompress.js',
        'src/views/app.config.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('src/views/'));
});

//sass编译合并任务
gulp.task('sass-compressor', function () {
    gulp.src('src/sass/*.scss')
    .pipe(sass(/*{outputStyle: 'compressed'}*/).on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('src/css/'));
});


//默认任务：命令 - gulp [default]
gulp.task('default', function () {
    //监听js
    gulp.watch(['src/views/*.js', '!bundle.js'], ['js-compressor']);
    //监听sass
    gulp.watch(['src/sass/*.scss'], ['sass-compressor']);

});