# gulp
gulp环境搭建
cnpm init  初始化package.json  
cnpm install gulp --save-dev  下载gulp模块保存本地  
cnpm install --save-dev gulp@next del  清理文件夹  
cnpm install gulp-htmlmin --save-dev  
（gulp-htmlmin可以压缩页面javascript、css，去除页面空格、注释，删stall gulp-imagemin --save-dev  图片压缩模块  
cnpm install imagemin-pngquant --save-dev  png深度压缩  
cnpm install gulp-cache --save-dev  cache缓存，只操作修改文件  
cnpm install gulp-clean-css --save-dev  css压缩  
cnpm install --save-dev gulp-less  将less文件编译成css   
cnpm inst除多余属性等）   
cnpm inall --save-dev gulp-sass  将sass文件编译成css    
cnpm install babel-cli --save-dev  babel安装     
cnpm install --save-dev babel-preset-es2015  ES2015转码规则  
cnpm install --save-dev gulp-babel  安装gulp-babel      
cnpm install gulp-rev-append --save-dev     页面引用资源添加版本号，避免缓存
cnpm install gulp-zip --save-dev   zip压缩包
cnpm install gulp-uglify --save-dev  js压缩
cnpm install --save-dev gulp-plumber  阻止 gulp 插件发生错误导致进程退出并输出错误日志  
cnpm install gulp-autoprefixer --save-dev 自动处理浏览器前缀   
cnpm install browser-sync --save-dev  开启一个websocket服务，使用Reload实现实时更新  
cnpm install gulp-ssh --save-dev ssh代码上传    
(gulp.series gulp.parallel适用于gulp 4.0版本）  
本地测试：gulp build  
		编译src下文件到dist下，浏览器自动打开已配置的首页html，监听src下文件变化，并进行编译，dist发生改变刷新浏览器  
代码上传：gulp dev  
		下载openssh进行本地ssh代码上传测试（代码上传已成功，但shell命令会卡死，暂时还没解决）  



