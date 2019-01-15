# Loading

## 版本
V1.0

## 简述

加载效果UI组件。

## 快速入门

### 1. 引入组件

组件基于zepto进行封装，请确认在引入组件之前项目下已经引入`/pc/ui/third-party/zepto.js`，**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。**

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Loading from 'PATH/ui/ui-othors/loading/loading';
```

### 2. 使用示例

```html
<button onclick="testLoading">test loading</button>
```

```javascript
function testLoading() {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 3000)
}
```

## API

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| show()| null | 显示Loading |
| hide() | null | 关闭Loading |
