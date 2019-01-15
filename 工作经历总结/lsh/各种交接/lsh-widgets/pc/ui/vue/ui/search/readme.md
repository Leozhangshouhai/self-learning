# Search

## 版本
V1.0


## 简述

Search提供常用的搜索条件表单类型，包括input、select、日期及日期区间等，默认会提供搜索和重置操作按钮，通常会配合Tables组件一同使用。Search与外界通信的方式，是将当前搜索结果参数提交到Vuex，通过`searchParams`共享组件状态。


## 快速入门


### 1. 引入组件

注：组件依赖于`/pc/ui/lib`下提供的`storage.js`，`location-helper.js`，`event.js`文件，请确认在引入组件之前项目下已经引入这些文件。组件需要datepicker与batchInput作为子组件，提供日期选择及批量输入功能，请确认在引入组件之前项目下已经引入`/pc/ui/vue/ui/datepicker/`及`/pc/ui/vue/ui/batch-input/`下所有文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。** 由于Search组件使用的API基于`basic.js`，在使用tables组件之前要确认页面已经引入`basic.js`。

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

在业务层js开发中引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Search from 'PATH/ui/vue/ui/search/search';
import Store from 'PATH/ui/vue/vuex/store';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
// 第一个参数为自定义标签名，第二个参数传入组件，第三个参数为组件相关配置
$$Component('test-search', Search, {});

// 页面根实例，$$Page为basic层封装并扩展的new Vue方法
$$Page({
    data() {
        return {}
    },
    store: Store
});

```

### 2. 简单示例

实现一个包含所有Search组件搜索表单类型的实例：

HTML

```html
<div class="test">
    <my-search></my-search>
</div>
```

JS

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Search from 'PATH/ui/vue/ui/search/search';
import Store from 'PATH/ui/vue/vuex/store';

$$Component('my-search', Search, {
    // wrap为包裹容器，示例中选用自定义标签的父元素div作为容器，使用div的class作为标记
    wrap: ".test",
    // search配置
    config: [
        // 输入框
		{
			"type": "input",
			"label": "输入框",
			"key": "testInput"
		},
        // 批量输入框
        {
			"type": "batchInput",
			"label": "批量输入框",
			"key": "testBatchInput"
		},
        // 下拉框
		{
			"type": "select",
			"label": "下拉",
			"key": "testSelect",
            // option会读取下拉项相关配置中的同名配置
			"option": "testSelect"
		},
        // 日期
        {
			"type": "dateSingle",
			"label": "日期",
			"key": "testDate"
		},
        // 日期区间
		{
			"type": "dateRange",
			"label": "日期区间",
			"key": {
                // 分别定义其实日期字段与终止日期字段
				"begin": "dateBegin",
				"end": "dateEnd"
			}
		}
    ],
    // 下拉项相关配置
    searchConf: {
        // 下拉项中option属性值为testSelect会默认读取该属性
        "testSelect": {
            1: "下拉项1",
            2: "下拉项2",
            3: "下拉项3"
        }
    }
});
```

### 3. 配合Tables组件使用搭建PC端列表页

通常情况下，Search会与Tables一同使用，作为一套PC后台列表页搭建的方案，Tables具体使用请参考[Tables说明文档](../tables)，两者间的通信通过Vuex来解决，实现如下：

```html
<div class="test">
    <my-search></my-search>
    <my-table></my-table>
</div>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Search from 'PATH/ui/vue/ui/search/search';
import Table from 'PATH/ui/vue/ui/tables/tables';
import Store from 'PATH/ui/vue/vuex/store';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
$$Component('my-table', Table, {
    wrap: "test"
});

$$Component('my', Search, {
    wrap: "my-search",
    config: [
        {
			"type": "input",
			"label": "搜索关键词",
			"key": "testSearchKey"
		}
    ]
});

// 页面根实例，$$Page为basic层封装并扩展的new Vue方法
$$Page({
    data() {
        return {}
    },
    store: Store
});

```

## 入口参数

**Search(options)**

| 参数 | 必选 |类型 | 描述 |
| --- | --- | --- | --- |
| options | false | Object | Search配置参数 |

在使用组件时，需要在JS文件中实例化组件。

## options

| 参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| wrap | String | true | 定义表格最外层的包裹容器，引入basic.js扩展事件代理机制后，作为事件监听获取的根节点 | |
| config | Array | true | 搜索表单配置 | |
| searchConf | Object | false | 为搜索表单类型为select的搜索项配置option同名的下拉项数据，若配置了select，该属性中必须有同名配置，否则会引起报错 | |

## config

| 属性 | 必要 | 说明 | 可选值 |
| :---: | :--- | :--- | :--- | :--- |
| type | true | 定义搜索项的表单输入类型 | select/input/batchInput/dateSingle/dateRange |
| key | true | 定义搜索项字段名，若type值为dateRange，则key的数据类型为包含begin和end属性的Object；若type为其他，则key为String |  |
| label | false | 搜索项表单label文案 |  |
| placeholder | false | 搜索项表单placeholder文案 |  |
| option | false | 若type值为select，则必须配置option属性值，select会读取searchConf下的同名属性配置 |  |


## API

目前Search组件暂不对外暴露方法。
