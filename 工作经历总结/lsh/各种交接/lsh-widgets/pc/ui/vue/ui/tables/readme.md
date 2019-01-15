# Tables

## 版本
V1.0

## 简述

Tables组件通常适用于PC平台的表格数据展示，可结合CMS一同使用。
注：（异步请求获取到的表格数据格式需要提前约定，列表数据默认读取请求返回数据下的content.list数组中的数据）
Tables内部定义了获取Vuex`searchParams`（Search组件状态）与`pageNum`（Pages组件状态）状态值的方法，可与Search（[参照Search使用文档](../search)）与Pages（[参照Pages使用文档](../pages)）进行状态变化通信。


## 快速入门

### 1. 引入组件及依赖文件

注：
* 组件依赖于`/pc/ui/lib/`下提供的`storage.js`，`fetch.js`，`typeCheck.js`文件，请确认在引入组件之前项目下已经引入这些文件。
* 表格组件超出容器文本滚动显示效果，需要依赖`scrollable`组件，请确认在引入组件之前项目下已经引入`/pc/ui/ui-others/scrollable/`下所有文件。
* 表格支持分页处理，需要依赖`pages`作为子组件来支持表格分页，请确认在引入组件之前项目下已经引入`/pc/ui/vue/ui/pages/`下所有文件。
* 父子组件间的通信需要通过`vuex`来实现，请确认业务层编写时引入并使用`/pc/vuex/store.js`。
* 由于Tables组件使用的API基于`basic.js`，在使用Tables组件之前要确认页面已经引入`basic.js`。

**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。**

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

在业务层js开发中引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
import Store from 'PATH/ui/vue/vuex/store';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
// 第一个参数为自定义标签名，第二个参数传入组件，第三个参数为组件相关配置
$$Component('test-table', Table, {});

// 页面根实例，$$Page为basic层封装并扩展的new Vue方法
$$Page({
    data() {
        return {}
    },
    store: Store
});

```

### 2. 简单示例

一个简单的表格示例，从`/test/table/getData`下获取表格数据，生成一个可分页的表格，如下：

HTML

```html
<div class="test">
    <my-table></my-table>
</div>
```

JS

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';

$$Component('my-table', Table, {
    // wrap为包裹容器，示例中选用自定义标签的父元素div作为容器，使用div的class作为标记
    wrap: ".test",

    url: "/test/table/getData",

    // 表头配置，数组中每个元素必须包含key和title值，title为当前列表头显示的内容，key表示当前列的每一行表体数据将读取的字段名
    thead: [
        {
            key: "col1Key",
            title: "第一列"
        },
        {
            key: "col2Key",
            title: "第二列"
        }
    ]
});
```

通常，PC端业务开发，表格展示类页面，会结合CMS进行一些表头配置。上诉示例中，可以将表头及url配置放在CMS中，表格会默认读取CMS的相关配置。CMS JSON配置如下：

```json
tables {
    dataUrl: "/test/table/getData",
    thead: [
        {
            key: "col1Key",
            title: "第一列"
        },
        {
            key: "col2Key",
            title: "第二列"
        }
    ]
}
```

js中则不需要再定义`url`、`thead`属性。如下：

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test"
});
```

### 3. 配置不分页表格

通常，在PC后台类项目中，可能存在不需要配置分页的表格，Tables提供分页相关的配置属性`paging`，将属性设为`false`表格则不分页，如下：

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test",
    paging: false
});
```

pattern属性是正则校验规则，cmsg为不满足此校验规则时的错误提示信息。

### 4. 表格特殊字段处理

表格的每一行的数据渲染，该行的每一列读取的数据，与当前列需要读取的配置字段对应。若读取的某个字段需要进行特殊的逻辑处理或者特定操作，Tables提供一个`filters`属性来自定义一些特殊字段的显示规则。例如上述示例中的`thead`配置，若读取`col2Key`的值时，若`col2Key`有值则显示对应的数据，若无值，则返回"---"，实现如下：

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test",
    filters: {
        // 函数名与key值要求一致，Tables内部会判断，当key返回的值为一个方法时，执行这个方法。
        // 方法的三个参数，第一个参数为当前字段读取的值，第二个参数为当前行读取的列表当前元素的值，第三个参数为字段的扩展参数，读取thead配置中当前配置的flag属性值，通常用来应对当前字段读取值为对象或数组时，需要显示对象中的某个属性值或数组中的某个元素。
        "col2Key": function(content, data, flag) {
            return !content ? "---" : content;
        }
    }
});
```

Tables组件目前提供了时间格式数据和数字格式的特殊处理，例如key为`date`的字段值为一个十位的时间戳格式数据，通过thead配置中对此字段进行`type: "date"`或则`type: "time"`可以显示成日期格式。对于数字，使用`type: "number"`配置，可以处理0这种特殊情况下的显示。如下：

```json
tables {
    thead: [
        {
            key: "date",
            title: "日期",
            type: "date"
        },
        {
            key: "testNum",
            title: "数字",
            type: "number"
        }
    ]
}
```

### 5. 表格数据操作

在PC后台类项目中，有时候需要对表格中的一些数据进行操作，比如给每一行数据提供一个删除按钮，利用`filters`属性，上述示例中，可以如下编写：

先给每列增加一列操作相关的配置，`thead`配置如下：

```json
tables {
    dataUrl: "/test/table/getData",
    thead: [
        {
            key: "col1Key",
            title: "第一列"
        },
        {
            key: "col2Key",
            title: "第二列"
        },
        {
            key: "operation",
            title: "操作"
        }
    ]
}
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test",
    filters: {
        "operation": function(content, data, flag) {
            // 这里我们假设每列删除需要以col1Key为标识
            return `<span data-id='${data.col1Key}' class="delete">删除</span>`;
        }
    },
    // listeners属性封装来源于basic.js对Vue的扩展，用于做事件代理，key值为字符串
    // 事件与绑定标识用空格隔开，空格隔开的第一个字符串为事件名，详见basic.js说明
    listeners: {
        "click .delete": function(e) {
            let id = e.target.dataset.id;
            alert(`删除${id}行的数据`)
        }
    }
});
```

### 6. 表格数据的批量操作

有时候，可能会有点击某个按钮去批量操作表格数据的场景，这时，可以给表格每一行提供一个勾选操作，表头提供一个全选操作。通过将Tables的`selectable`属性来开启批量操作复选框。再通过Tables组件的Vue实例中的`checkeditems`属性得到选中的数据。如下：

```html
<div class="test">
    <button class="show-selected">显示选中数据</button>
    <my-table></my-table>
</div>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test",
    selectable: true,
    listeners: {
        // 第一个参数为当前的事件句柄，第二个参数为当前的组件实例viewModel
        'click .show-selected': function(e, vm) {
            console.log(vm.checkeditems);
        }
    }
});
```

**注：如果当前表格组件同时启用了分页与批量操作复选框，则全选操作只选中当前分页的所有数据**。

当然，有时候提供批量操作需要对当前数据进行一些逻辑判断，如果不满足则不显示勾选框，显示的逻辑判断可以通过`selectableFilter`属性来判断。例如，上述例子中，假设当读取当前行数据时，`col1Key`的值为1时，则不可以选择，实现如下：

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
$$Component('my-table', Table, {
    wrap: ".test",
    selectable: true,
    selectableFilter(data) {
        // 函数的参数为当前行对应的列表元素的数据
        // 返回值若为true则显示复选框，若为false则不显示
        return data.col1Key != 1;
    }
});
```

### 7. 表格顶部内容插槽

Tables组件在表头顶部提供了`tablesSlot`插槽，可以自定义一些内容。如下：

```html
<div class="test">
    <my-table>
        <div slot="tablesSlot">
            我是表格顶部的插槽
        </div>
    </my-table>
</div>
```

对于一些纯文案，Tables还支持文案配置，例如对表格相关的汇总数据进行说明，可以通过`sumcontent`属性配置，在CMS上可配置如下：

```json
tables {
    thead: [
        {
            key: "col1Key",
            title: "第一列"
        },
        {
            key: "col2Key",
            title: "第二列"
        },
        {
            key: "operation",
            title: "操作"
        }
    ],
    sumcontent: "总共有{total}条数据" //{total}表示读取total这个变量
}
```

**注：sumcontent属性为字符串，其中{}区域可配置需要读取的相关的数据字段，默认会读取请求返回的content.statistics下的数据，这部分需要和接口返回数据格式提前约定好**


### 8. 结合Search组件的PC常用列表页搭建

通常，PC后台系统列表页以Tables组件做数据展示为主，往往还需要提供数据筛选或搜索的机制，这里通常会将Search（具体使用可参考Search组件使用文档）作为Tables的兄弟组件协作完成。两者间的通信通过Vuex来解决。一个最简单的PC列表页搭建实现如下：

```html
<div class="test">
    <my-search></my-search>
    <my-table></my-table>
</div>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Table from 'PATH/ui/vue/ui/tables/tables';
import Search from 'PATH/ui/vue/ui/search/search'
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

**Tables(options)**

| 参数 | 必选 |类型 | 描述 |
| --- | --- | --- | --- |
| options | true | Object | 表格实例的配置参数 |

在使用组件时，需要在JS文件中实例化组件。

## options

必选项options包括组件默认的配置及自定义配置。

| 参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| paging | Boolean | false | 是否需要分页 | true |
| selectable | Boolean | false | 是否开启勾选功能 | false |
| selectableFilter | Function | false | 勾选框通道函数，可在函数内部定义勾选框显示的逻辑，参数为列表当前元素数据，需要返回true或false判断当前行是否显示勾选框 | (() => true) |
| filters | Object | false | 自定义字段的处理方法集合。内部属性由需要处理的字段名作为属性名，处理方法为值构成 |  |
| url | String | true | 请求获取列表数据的地址 |  |
| thead | Array | true | 表格表头配置，每个元素为一个Object，Object必须包含key于title属性 |  |
| sumcontent | String | false | 表格顶部说明文案，支持变量表示，变量使用{}包裹 |  |
| listeners | Object | false | 通过basic.js对Vue进行扩展的事件代理属性，属性名为包含事件名与事件绑定标识的字符串，属性值为对应的回调方法 |  |
| wrap | String | true | 定义表格最外层的包裹容器，引入basic.js扩展事件代理机制后，作为事件监听获取的根节点 | |
| errorMessage | String | false | 定义表格数据加载出错时显示的文案 | "数据请求错误！" |


## thead配置

| 属性 | 必要 | 说明 |
| :---: | :--- | :--- | :--- |
| key | true | 当前列需要读取的字段名 |
| title | true | 当前列表头文案 |
| type | false | 当前字段类型，定义`type: "date"`或则`type: "time"`时，可以将十位的时间戳显示成日期格式。定义`type: "number"`时可将数字类型数据格式化正常输出 |
| flag | false | 若当前读取字段为Object或Array数据类型，可通过配置flag来读取当前字段下属性为flag配置值或index为flag配置值的数据 |


## API

目前Tables组件暂不对外暴露方法。


## 异常处理

当请求数据失败或数据格式返回出错时，会直接读取并显示后端返回的错误提示信息或Tables默认的错误提示信息。
