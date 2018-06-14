> vue+element-ui+axios   webpack多页面pc端模板
>URL ---http://localhost:8081/html/index.html.

###### 项目介绍：

* src/assets/js/linyer.js作为本项目的公共js文件。里面包含了数据交互(封装好的axios)、部分常用的处理函数、排序、本地存储(可以设置过期时间的localstorage)、验证中文和手机号、以及md5的加密解密函数。除开使用prototype可以直接调用之外，里面其他函数皆使用一下方法来调用:
```
    import fly from "../assets/js/linyer"
    比如我们调用接口：
    fly.Axios({
        url: this.api.url,
        data: {city_name: encodeURI("成都市")},
        success: function (res) {
            console.log(res)
        }, error: function (err) {
            console.log(err)
        }
    })
```
*多页面开发，一般选择公共css放在assets/css/index.scss中，其他css依附于当前vue页面或者放在assets/css/modules/下。

```
    <style lang="scss" scoped>
    详细的scss代码
    </style>
```


###### 目录结构说明：
├─build                           配置<br>
├─config                          配置<br>
├─src                             <br>
│  ├─assets                       <br>
│  │  ├─css         ——css目录<br>
│  │  │  └─fonts   ——字体文件目录<br>
│  │  │  └─modules   ——各页面scss存放目录<br>
│  │  │  └─index.scss    ——公共scss文件<br>
│  │  │  └─iconfont.css         ——字体图片css文件<br>
│  │  ├─images         ——图片目录<br>
│  │  └─js          ——js目录<br>
│  ├─components     ——组件目录<br>
│  │  └─system      ——系统组件目录<br>
│  │  └─index      ——每一个组件一个目录<br>
└─static            ——不需要打包的静态文件<br>

## 安装过程:

###### 安装淘宝镜像
> npm install -g cnpm --registry=https://registry.npm.taobao.org

###### 安装webpack
> cnpm install webpack -g

###### 安装脚手架
> npm install vue-cli -g

###### 如果遇到以下之类的报错
> Error: Cannot find module 'opn'

> Error: Cannot find module 'webpack-dev-middleware'

> Error: Cannot find module 'express'

> Module build failed: Error: Cannot find module '模块名'

###### 缺什么安装什么，或者将所有旧环境全部删除，下载最新的环境

> cnpm install 模块名 --save-dev(关于环境的，表现为npm run dev 启动不了)cnpm install 模块名 --save(关于项目的，比如main.js，表现为npm run dev 成功之后控制台报错)

###### 使用方法:
> 开发命令：npm run dev

> 打包生产包命令：npm run build

> 打包UAT包命令：npm run uat

> 合并打包命令：npm run concat   异步进行uat和prod包的打包



###### 更新记录:
* 2017-9-4    --

###### BUGS:

###### FAQ:
* Q:
* A:

###### TODO:

###### THANKS:
