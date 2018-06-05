const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rev = require('gulp-rev-append');
const cssmin = require('gulp-clean-css');
const lessMin = require("gulp-less");
const sassMin = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const cache = require('gulp-cache');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
/*实时监控*/
gulp.task("watchNow", function() {
    browserSync.init({
        files: [
             "src/**/.html", 
             "./src/**/*.css",
             "./src/**/*.js"
         ],
         logLevel: "debug",
         logPrefix: "insgeek",
         server: {
            /*这里写的是html文件相对于根目录所在的文件夹*/
             baseDir: "./src",
            /*这里如果不写，默认启动的是index.html，如果是其他名字，需要这里写*/
             index: "doctor_finish.html"
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        browser: "chrome"
    });
}); 
//压缩除demo1.js和demo2.js外的所有js，babel转换
gulp.task('jsmin', function() {
    return gulp.src(['src/js/**/*.js', '!src/js/**/{demo1,demo2}.js'])
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify({
            compress: true, //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
        .on('error', (err) => {
            console.log(err)
        });
});
//页面引用资源添加版本号+html压缩
gulp.task('htmlminRun', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(htmlmin(options))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}))
        .on('error', (err) => {
            console.log(err)
        });
});
//css压缩+css添加浏览器前缀
gulp.task('cssminRun', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
        .on('error', (err) => {
            console.log(err)
        });
});
//less编译+css添加浏览器前缀+css压缩
gulp.task('compileless', function() {
    return gulp.src('src/less/**/*.less')
        .pipe(plumber())
        .pipe(lessMin())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/less'))
        .pipe(connect.reload())
        .on('error', (err) => {
            console.log(err)
        });
});
//sass编译+css添加浏览器前缀+css压缩
gulp.task('compilesass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sassMin())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/scss'))
        .pipe(connect.reload())
        .on('error', (err) => {
            console.log(err)
        });
});
//压缩发生改变的图片 
gulp.task('imageminTest', function() {
    return gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(plumber())
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload())
        .on('error', (err) => {
            console.log(err)
        });
});
//监听文件变化
gulp.task('antwatch', function() {
    gulp.watch('src/**/*.html', 'htmlminRun')
    gulp.watch('src/css/**/*.css', 'cssminRun')
    gulp.watch('src/less/**/*.less', 'compileless')
    gulp.watch('src/scss/**/*.scss', 'compilesass')
    gulp.watch('src/js/**/*.js', 'jsmin')
    gulp.watch('src/img/**/*.{png,jpg,gif,ico}', 'imageminTest')
});
//清空文件夹
gulp.task('clean', function() {
    return del([
        'dist/**/*',
    ]);
});
//启用websocket服务
gulp.task('startserver', function() {
    return connect.server({
        livereload: true,
        port: 8888
    })
});
//启用
gulp.task('build',
    gulp.series(
        'clean',
        gulp.parallel(
            'jsmin',
            'htmlminRun',
            'cssminRun',
            'compileless',
            'compilesass',
            'imageminTest',
        ),
        'watchNow',
        'startserver'
    )
);