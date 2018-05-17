# gulp
gulp环境搭建
cnpm init  初始化package.json  
cnpm install gulp --save-dev  下载gulp模块保存本地  
cnpm install gulp-htmlmin --save-dev  
（gulp-htmlmin可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等）   
cnpm install gulp-imagemin --save-dev  图片压缩模块  
cnpm install imagemin-pngquant --save-dev  png深度压缩  
cnpm install gulp-cache --save-dev  cache缓存，只操作修改文件  
cnpm install gulp-clean-css --save-dev  css压缩  
cnpm install --save-dev gulp-less  将less文件编译成css   
cnpm install --save-dev gulp-sass  将sass文件编译成css    
页面引用资源添加版本号，避免缓存
cnpm install gulp-rev-append --save-dev 
cnpm install gulp-uglify --save-dev  js压缩
cnpm install --save-dev gulp-plumber  阻止 gulp 插件发生错误导致进程退出并输出错误日志  
cnpm install gulp-autoprefixer --save-dev 自动处理浏览器前缀  
cnpm install gulp-livereload --save-dev 文件发生变化浏览器自动刷新(适用于谷歌浏览器，需安装livereload插件)    
cnpm install gulp-connect --save-dev 开启一个websocket服务，使用liveReload实现实时更新  
cnpm install gulp-sequence --save-dev 管理task执行顺序  



