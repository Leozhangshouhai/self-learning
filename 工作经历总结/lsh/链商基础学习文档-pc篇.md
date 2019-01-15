# 链商FE基础学习文档-pc项目篇

写这篇文档的目的主要是帮助新入职的同学们能够尽快的了解链商前端在各业务方向上的技术使用情况，能够在整体了解的前提下有针对性的进行知识与技术方向上的补足和学习，更好的进行项目开发。

这一篇目主要针对的是PC相关的后台类项目，同时在开始前会就一些基础知识方面进行介绍和要求，按照顺序阅读即可。

[TOC]

## 基础知识

前期需要掌握的知识内容主要有以下几点，后面会一次简单展开说一下：

```
linux命令行基本操作
Git版本管理(命令行与图形化管理工具)
fis fisp 与 fis3
```

### linux命令行基本操作

目标：作为前端开发人员，需要熟练使用基本的linux操作命令，因为在项目中，会经常碰到使用命令行的情况，比如：fis的安装与启用、通过brew来安装软件、git操作等等，以下是必须要掌握的一些linux命令，更多的内容可以自行查找学习。

`cd、ls、pwd、mkdir、rmdir、touch、rm、sudo`

同时由于我们的项目开访问的是物美的网络，所以经常涉及到修改hosts的操作，这点也需要了解：

```
sudo vim /etc/hosts //即通过vim修改host，可根据项目的不同对内or外网host进行设置
```

如果对这方面比较感兴趣的话，也可以通过下面所给出的文章进行入门，更多内容就有待自己进行探索了。

Linux入门教程： http://www.92csz.com/study/linux/

### Git版本管理

出于多人协作开发，版本管理的目的，我们引入了版本管理工具Git，因此在开发之初需要对Git有比较好的认识，同时对基础的一些命令和原理进行了解，以方便在后续开发过程中遇到问题能够比较好的解决。

在这里给予两个比较好的学习教程，分别是：

> git简易指南 http://www.bootcss.com/p/git-guide/
> 廖雪峰的git教程 https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

前者比较通俗易懂，如果之前没有接触过git相关知识，可以快速阅读一下以便上手；而后者的讲解相比较而言会细致一些，也同时分享了一些奇技淫巧，应用在实际项目开发中也能够适当的提升工作效率。
 至于图形化工具而言，我本人是没有在使用的，如果觉得命令行不那么友好，想要使用更直观的图形化工具，那么也推荐两个：<code><a href="https://www.sourcetreeapp.com/">sourceTree</a> 与 <a href="https://desktop.github.com/">GitHub for Mac</a></code>，就同事的使用反馈来看还是不错的，值得一试。

### fis相关

可能你之前并没有听说过fis，fis是专为解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题的前端工程化构建工具。
链商在前端工程化方面选择的工程化工具就是fis，我们从早期的fis-plus(基于fis进行拓展的适用于后端为php的前端集成解决方案)到现在一些新的业务线使用fis3，一直都是fis的忠实拥簇者，当你了解了它的配置与使用方式后，相信你也会爱上它的方便快捷与定制化。
在正式接触开发之前你需要对fis的相关内容进行了解，当然也看你要接触到的项目需要哪一部分内容而有所不同。
<code><a href="http://fex.baidu.com/fis-site/">fis</a>基础性内容
<a href="http://oak.baidu.com/fis-plus">fis-plus</a>早期项目使用到的解决方案，主要包括TMS(运输管理系统)、MIS(商城管理系统)、竞品监控、优供商城、销售端等等。
<a href="http://fis.baidu.com/">fis3</a>后续新项目主要使用的解决方案，比如VSS(链商财务管理系统)、newCMS(运营配置内容管理系统)、WMS(仓库管理系统)、邻选无人便利店等等</code>

## 项目相关

PC相关项目主要分为两种技术栈：

> fis-plus + jQuery + smarty 以MIS TMS 竞品监控为代表
> fis3 + zepto + Vue + Vue-router + VueX 以WMS VSS 邻选为代表

因此项目相关的技术栈介绍也主要分这两个方面展开，在下面主要称为方向一与方向二。

### 方向一

#### jQuery

了解jQuery常用工具方法，能够正常使用，并了解其中原理。
在使用前确认自己使用的jQuery版本，多翻翻API说明。
推荐的API查询地址：http://jquery.cuishifeng.cn/

#### smarty

了解基本语法与常用方法即可。
smarty函数使用建议：

* foreach(包括foreach提供的属性以及方法)
* if ... else ...
* widget(包括widget提供的属性以及方法)
* default
* strip
* block
* assign
* for
* extend

smarty的一切函数都是php函数的包装，由于包装做了很多个性化处理，在某些函数处理效率不高，建议除了以上函数外其它函数使用php函数代替。

推荐的smarty学习地址：https://www.smarty.net/docs/zh_CN/ ,选取个人所需即可(在实际项目中用到的也是比较简单的用法)

### 方向二

#### ES6

这一方向的项目代码中比较多的使用了ES6中的语法，因此在开发前需要对ES6有一些认识，必须的部分有：

`变量定义(let const)` `箭头函数( ()=>{} )` `Promise` `ES6原生模块化(import export)` `对象的扩展` `数组的扩展` `fetch请求相关`

了解以上部分有助于提升代码阅读速度，了解业务逻辑等。这里推荐几个地方进行相关学习：

阮一峰大神的ECMAScript6入门：http://es6.ruanyifeng.com/ 
这个比较适合速查使用，如果全篇学习成本其实还是比较高的

众诚翻译ES6新特性：http://zcfy.baomitu.com/article/es6-features-2596.html
这篇比较精简，可以快速过一下，但涉及的内容不怎么全

给javaScript初心者的ES2015实践：http://gank.io/post/564151c1f1df1210001c9161
这个我觉得还是不错的，覆盖了大部分需要用到的内容

#### Vue

后续的新项目大部分选择了Vue作为基础框架，无论是否为单页应用。同时我们对Vue进行了二次封装，对部分功能进行了扩充(WMS VSS 邻选后台)。在了解这方面内容之前，需要对Vue本身有比较清晰的认识。

就对Vue的学习上，我认为官方文档是最好的教程。如果之前没有实际使用过Vue的话，那么推荐把`基础章节`多阅读几遍(加上`可复用性 & 组合`章节中的`过滤器`)，此时先暂时抛开其中的`组件`部分，自己先写一些小例子以便于能有更清晰的认识。当对整体有比较清晰的认识以后再对`组件`相关内容进行阅读学习。

官方文档地址： https://cn.vuejs.org/v2/guide/

如果完成这些内容阅读与学习后，只是就项目开发方面已经不存在过多的问题了。这个时候项目中的代码你已经能够完全看得懂，如果你对它的原理有更深层的兴趣，那么也推荐几篇文章进行阅读。

Vue源码分析：https://github.com/answershuto/learnVue
涉及了Vue响应式原理 依赖收集 事件机制 VirtualDom等较多方面的分析，各种优劣需要自己需辨别一下，整体还是很不错的。

Vue2.0源码阅读-响应式原理：http://zhouweicsu.github.io/blog/2017/03/07/vue-2-0-reactivity/

这个只是针对响应式原理的文章，分析的还是比较清楚的，也推荐看看

#### VueX

在学习VueX之前，要先了解Vue中有哪些数据传递形式，比如父子组件，非父子组件等，要先了解VueX存在的意义以及有没有什么其它的替换方式。
了解了这些以后，依旧是阅读官方文档会是比较好的学习方式。

官方文档地址：https://vuex.vuejs.org/zh-cn/intro.html

#### Vue-router

Vue全家桶的最后一个，Vue单页面应用的必选项之一。
这算是一个比较简单的Vue组件，通过阅读官方文档就可以很好的了解其功能和使用方式，阅读完成后写一些简单的小例子就能明白了。

官方文档地址：https://router.vuejs.org/zh-cn/essentials/getting-started.html

#### Vue扩展

在Vue相关后台项目中，我们对Vue的使用方式进行了调整和拓展。
在Vue实例的注册上(WMS VSS)，使用了二次封装的`$$Page`方法，在Vue组件的注册上使用了二次封装的`$$Component`方法。

##### $$Page

对Vue实例化的封装，接受参数为一个配置对象，与Vue的配置对象属性几近相同，但增加了`listeners`属性，它的作用在于使用`zetpo`的事件机制，可以通过除DOM绑定外进行事件绑定，解除了部分耦合性，简单的使用例子如下：

```
$$Page({
    el: EL,
    data() {
        return {
            conf: conf.pageConf
        }
    },
    store: Store,
    listeners: {
        // 使用方式与zepto相同，事件类型 元素选择 
        // e 事件对象
        // vm Vue实例
        'click .ac-check-batch'(e, vm) {
            
        },
    }
});
```

##### $$Component

对Vue组件注册进行的封装，接受三个参数，`DOM标签名` `要实例化的组件` `对实例化组件进行的配置参数`，简单的使用例子如下：

```
$$Component('search', Search, {
    wrap: EL,
    config: cmsData.search,
    searchConf: cmsData.conf
});
```



## 附录

### 环境配置

#### iterm2

由于fis开发需要用到终端，所以这里给大家推荐一款好用的终端软件：iterm2

地址：http://www.iterm2.com/

#### brew
简化安装工作，通过终端安装应用，只需一行终端代码，高端、大气、上档次～～终端软件包管理工具：brew

地址：http://brew.sh/

#### node
node对前端工程师有着非常强的亲和力，有各种基于Node.js的压缩、优化、校验工具，有着极高的运行性能，有npm这样强大的包管理工具……简直就是为自动化和辅助开发工具量身定做的平台。fis也是基于node搭建的，这一步我们需要安装node。

#### nvm

nvm是个啥？nvm是一个可以让你在同一台机器上安装和切换不同版本node的工具。
我们在实际开发过程中，不同的项目可能依赖的node版本是不同的，那么也就需要进行对node版本进行管理与切换。
推荐的工具主要有`n`与`nvm`两种，但相比较而言我更推荐使用`nvm`，操作更简单，说明请直观~

相关安装说明文档：http://blog.csdn.net/xieamy/article/details/70270039

### 代码规范


1. class命名以小写字母和中划线组成，例如：i-vendor, ui-nav-hover
2. id命名采用驼峰式，例如：searchBoxInput
3. 模块的标示和命名规则：
    1. 使用id作为单个模块的唯一标示；
    2. class作为一类模块的标示并都以’mod-‘开头；
    3. 模块必须有log-mod属性（对应 log 里的 modId）；
    4. widget、数据、log-mod、class、id命名统一；
    5. 具体规则：
        1. widget名：中划线 product-list；
        2. 数据名：驼峰 productList；
        3. log-mod：驼峰 productList；
        4. class：mod-中划线 mod-product-list；
        5. 模块id：驼峰 productList；
4. id使用规则：
    1. 除模块标示id外，模块的内部元素不允许使用id；
    2. 为了模块复用，js内部不可以用硬编码形式使用id，而要对id进行传参，以变量方式使用。
5. css声明规则：
    1. css定义需要以模块类名作为前缀。无特殊需要的话，不要有中间类的类名存在，例如：.mod-product-list .product-img。
    2. 无特殊需要，不要直接使用id进行css声明。
6. 本地数据存储规范：
    1. cookie：
        1. 只能用于统计类及必须使用cookie的本地数据存储场景。
        2. 命名采用驼峰式，并尽量精简，例如：oldFriend；
        3. 单条cookie长度不可以超过50字节（包括key，等号，value，分号）
    2. 除统计类或其他必须使用cookie的本地数据存储均使用localstorage，命名规范与cookie一致。
7. z-index规范，按功能设定，每种划分层次范围
    1. 区域	z-index取值范围
    2. 内容区 0~99
    3. 气泡（刷新默认显示） 100~199
    4. sug 200~299
    5. 侧边栏（吸附浏览器边框类的浮动工具及其浮层） 300~399
    6. 页头及其功能浮层 400~499
    7. 功能浮层（用户交互后出现） 500~599
    8. dialog cover	9999
    9. dialog 10000
8. jquery选择器使用优先级建议：
id > class > \$(其它选择器,context) = $(context).find(其他选择器)




