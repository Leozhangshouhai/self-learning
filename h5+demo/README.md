1.做index页面，可结合mui 下tab-bar 底部选项卡的模式，做单一切换，不在app.vue上做，这样用户体验好很多
点击tab-bar 只做数据切换，但是需要记录每次回退到当前页面的index
2.app.vue中全局路由判断底部tab-bar的位置



##议案相关介绍
    技术栈：vue2.0+webpack+mint-ui+mui-ui+fis3
    外包壳子：h5+ 打包成原生应用 或者流应用
    node > 8.0
### 基础支持
    1.app内部检测升级
    2.自定义启动图
    3.复制粘贴
    4.canvas 截图保存
    5.原声弹窗和自定义弹窗（根据实际业务拓展）
    6.基础tabbar

#### 原生拓展能力
  http://www.html5plus.org/doc/zh_cn/downloader.html    

#### 代拓展
    1.除了底部tabbar的主页面打包成原生应用，其他的 页面可采用H5混合式开发。   

### PS
    报错 
    ...mapState([
              ^
               'pageDirection'
           ]),

  一定注意 在package.json 同级路径下，是否存在.babelrc，如果没有请建议对应文件内容如下
  {
    "presets": [
      ["env", { "modules": false }],
      "stage-2"
    ],
    "plugins": ["transform-runtime",["component", [
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]]],
    "comments": false,
    "env": {
      "test": {
        "presets": ["env", "stage-2"],
        "plugins": [ "istanbul" ]
      }
    },
    "ignore":["./src/assets/js/mui.min.js"]
  }
  



*其他当前页的scss或者css一般都写在当前页，如果会存在class命名冲突，则使用一下方式

```
    <style lang="scss" scoped>
    详细的scss代码
    </style>
```


###### 目录结构说明：
├─build                           <br>
├─config                          <br>
├─src                             <br>
│  ├─assets                       <br>
│  │  ├─css         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——css目录<br>
│  │  │  └─fonts   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——字体文件目录<br>
│  │  │  └─index.scss    &nbsp; &nbsp;——公共scss文件<br>
│  │  │  └─iconfont.css         &nbsp;——字体图片css文件<br>
│  │  ├─img         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——图片目录<br>
│  │  └─js          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——js目录<br>
│  ├─components     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——组件目录<br>
│  │  └─system      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——系统组件目录<br>
│  ├─router         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——路由目录<br>
│  └─store          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——配置vuex<br>
└─static            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——不需要打包的静态文件<br>

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
* 2017-7-27    &nbsp;&nbsp;&nbsp;&nbsp;——1.0.0.2版demo完成,添加uat测试环境,添加页面标题设置,修复ios的app下设置标题不成功的bug。

* 2017-7-21    &nbsp;&nbsp;&nbsp;&nbsp;——1.0.0.1版demo完成,添加路由按需加载。添加keep-alive缓存示例

###### BUGS:

###### FAQ:
* Q:
* A:

###### TODO:

###### THANKS: