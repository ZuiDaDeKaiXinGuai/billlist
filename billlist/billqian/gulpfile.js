var gulp = require('gulp');
var sass = require('gulp-sass');
var fs = require('fs');
var webser = require('gulp-webserver');

//编译sass
gulp.task('sass', function(req, res) {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听sass
gulp.task('watch', function(req, res) {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
})

//起服务
gulp.task('webser', function(req, res) {
    return gulp.src('./src')
        .pipe(webser({
            port: 8787,
            open: true,
            livereload: true,
            proxies: [{
                source: '/iconlist',
                target: 'http://localhost:3000/iconlist'
            }, {
                source: '/getlist',
                target: 'http://localhost:3000/getlist'
            }, {
                source: '/addlist',
                target: 'http://localhost:3000/addlist'
            }]
        }))
})

//dev事件
gulp.task('dev', gulp.series('sass', 'webser', 'watch'))