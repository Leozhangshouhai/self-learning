# Tabs

## 版本
V1.0

## 简述

Tabs分隔内容上有关联但属于不同类别的数据集合，可以为页面提供类似选项卡的功能。Tabs提供分隔切换状态的变化，通过Vuex中定义的的`currentTab`共享组件状态。

## 快速入门

### 1. 引入组件

注：组件依赖于`/pc/ui/lib`下提供的`typeCheck.js`，请确认在引入组件之前项目下已经引入该文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。**

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Vue from 'PATH/ui/third-party/vue';
import Store from 'PATH/ui/vue/vuex/store';
import Tabs from 'PATH/ui/vue/ui/tabs/tabs';
```

### 2. 简单示例

注册一个Tabs组件

```html
<tabs></tabs>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Vue from 'PATH/ui/third-party/vue';
import Store from 'PATH/ui/vue/vuex/store';
import Tabs from 'PATH/ui/vue/ui/tabs/tabs';

Vue.component('tabs', Tabs({
    tabs: [
        {
            key: 1,
            title: "Tab1"
        },
        {
            key: 2,
            title: "Tab2"
        },
        {
            key: 3,
            title: "Tab3"
        }
    ]
}))
```

传入配置参数tabs为一个数组，每个元素为一个包含`key`与`title`属性的对象，`key`为当前tab选项的标识，也作为当前Tabs组件的状态标识，`title`为当前tab的文案。

### 3. 结合CMS配置Tabs

Tabs组件默认会读取CMS的tabs配置，上述示例在CMS上可如下配置：

```json
{
    "tabs": [
        {
            key: 1,
            title: "Tab1"
        },
        {
            key: 2,
            title: "Tab2"
        },
        {
            key: 3,
            title: "Tab3"
        }
	]
}
```

## 入口参数

**Tabs(options)**

| 参数 | 必选 |类型 | 描述 |
| --- | --- | --- | --- |
| options | false | Object | Tabs配置参数 |

## options

| 参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| tabs | Array | true | 组件Tabs配置参数，数组的每个元素为一个包含`key`与`title`属性的对象，`key`为当前tab选项的标识，`title`为当前tab的文案，默认从CMS配置数据的tabs属性中读取，若CMS中未配置，则需要通过入口参数传入配置 | |

## API

目前Tabs组件暂不对外暴露方法。
