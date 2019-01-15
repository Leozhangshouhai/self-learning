# Pages

## 版本
V1.0

## 简述

Pages组件为表格组件提供分页功能，通常作为Tables的子组件使用。Pages与外界通信的方式，是将当前分页参数提交到Vuex，通过`pageNum`共享组件状态。

## 快速入门

### 1. 引入组件

注：组件依赖于`/pc/ui/lib`下提供的`storage.js`，请确认在引入组件之前项目下已经引入这些文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。** 由于Pages组件使用的API基于`basic.js`，在使用Pages组件之前要确认页面已经引入`basic.js`。

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

使用basic.js提供的API实例化组件，作为Tables的子组件引入Pages组件：

在Tables组件模板中定义pages的自定义标签

```html
<pages></pages>
```

在Tables组件JS中，通过Vue的`components`属性定义Pages为Tables的子组件，返回一个含有Pages作为子组件的Tables的配置

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Pages from 'PATH/ui/vue/ui/pages/pages';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
// 第一个参数为自定义标签名，第二个参数传入组件
return {
    components: $$Component('pages', Pages);
}

```

Tables与Pages进行父子组件通信时需要依靠Vuex来进行，在创建Vue实例时，必须引入Vuex。通常，在业务层，实例化Tables时，都需要引入Vuex，Tables在业务层使用的方法，可以参照[Tables使用文档](../tables)。
