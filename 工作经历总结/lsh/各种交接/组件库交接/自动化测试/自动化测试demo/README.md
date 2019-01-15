# 自动化测试demo

## 初始化环境

在文件根目录下执行

```bash
npm install
```

安装相关的node依赖包

## 运行

* 运行测试执行：

```bash
npm run test
```

* 实时监听调试执行

```bash
npm run debug
```

## 目录管理

```bash
.
├── README.md
├── karma.conf.js
├── lib
│   ├── jquery
│   │   └── jquery.js
│   └── vue
│       └── vue.js
├── package.json
├── test
│   ├── unit
│   │   └── image-upload.spec.js
│   └── util.js
└── widget
    └── image-upload.js
```

项目使用`karma + mocha + chai + sinon`实现，`karma.conf.js`配置进行Karma集成环境配置，`package.json`做相应的node模块及环境配置，`lib/`下用于管理文件依赖的第三方库或框架（如Vue、JQuery），`widget/`目录下存放测试组件，`test/unit/`目录下存放测试脚本，测试脚本命名与目标文件命名相对应，使用`目标文件名+.spec`命名。`test/`目录下`util.js`由于定义一些通用的工具方法。
