module.exports = {
    //上传配置
    ssh: {
        host: '127.0.0.1', //上传地址
        port: 22,  //上传端口
        username: 'zhao',  //当前系统管理员名
        password: '*****'  //管理员密码
    },
    remoteDir: `/server/dev`, //上传目录
    logsDir:'/logs', //日志目录
    commandsrm: [
        //删除现有文件
        `rm -rf server`
    ],
    commandsdl: [
        //下载依赖包
        `cnpm install`
    ],
};