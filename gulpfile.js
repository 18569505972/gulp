const gulp=require('gulp');
const htmlmin=require('gulp-htmlmin');
const cache = require('gulp-cache');
const cssmin=require('gulp-clean-css');
const rev=require('gulp-rev-append');
const uglify= require('gulp-uglify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const less = require("gulp-less");
const sass = require("gulp-sass");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
//html压缩
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html')
    	.pipe(plumber())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
//css压缩
gulp.task('testCssmin', function () {
    gulp.src('src/css/**/*.css')
    	.pipe(plumber())
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});
//less编译
gulp.task('compile-less', function () {
    gulp.src('css/**/*.less')
	    .pipe(plumber())
	    .pipe(less())
	    .pipe(gulp.dest('dist/css'));
});
//sass编译
gulp.task('compile-sass', function () {
    gulp.src('css/**/*.sass')
	    .pipe(plumber())
	    .pipe(sass())
	    .pipe(gulp.dest('dist/css'));
});
//页面引用资源添加版本号
gulp.task('testRev', function () {
    gulp.src('src/*.html')
    	.pipe(plumber())
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
//压缩除demo1.js和demo2.js外的所有js
gulp.task('jsmin', function () {
    gulp.src(['src/js/**/*.js', '!src/js/**/{demo1,demo2}.js'])
        .pipe(plumber())
        .pipe(uglify({
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('dist/js'));
});
//压缩发生改变的图片 
gulp.task('testImagemin', function () {
    gulp.src('src/img/**/*.{png,jpg,gif,ico}')
    	.pipe(plumber())
        .pipe(cache(imagemin({
            progressive: true, //无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/img'));
});
//添加浏览器前缀
gulp.task('testAutoFx', function () {
    gulp.src('src/css/**/*.css')
    	.pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});
//浏览器自动刷新
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*.*', function(file) {
        livereload.changed(file.path);
    });
});