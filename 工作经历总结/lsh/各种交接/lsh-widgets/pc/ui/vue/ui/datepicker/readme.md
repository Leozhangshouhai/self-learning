# Datepicker

## 版本
V1.0

## 简述

Datepicker提供日期时间选择功能

## 快速入门

组件基于[datepicker-lib.vue](https://github.com/hilongjw/vue-datepicker)组件进行封装；

### 1. 引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Vue from 'PATH/ui/third-party/vue';
import Datepicker from 'PATH/ui/vue/ui/datepicker/datepicker';
```

### 2. 简单示例

```html
<datepicker @change="changeDate"></datepicker>
```

```javascript
Vue.component('datepicker', Datepicker());

new Vue({
    data() {
        return {}
    },
    methods: {
        changeDate(type, name, value) {
            console.log(type);
            console.log(name);
            console.log(value);
        }
    }
})
```

当选中时间日期后，会触发一个change事件，绑定一个change方法，可以接收组件相关状态数据。

## Props

| 属性参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| date | String | false | 默认传入的时间值 |  |
| option | Object | false | Datepicker的配置参数 |  |
| limit | Object | false | 时间区间限制配置参数 |  |
| name | String | false | Datepicker作为表单控件时的name属性配置 |  |
| type | String | false | Datepicker的日期显示类型，值为"day"/"min"或"multi-day" | "day" |


## Events

| 事件名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| change(type, name, value) | null | 当选中日期时间值变化后触发，第一个参数为Datepicker日期显示类型配置，第二个参数为Datepicker的name属性，第三个参数为选中的值 |

## option

Datepicker提供个性化的配置，详细可参考底层[datepicker-lib.vue](https://github.com/hilongjw/vue-datepicker)的具体实现及说明文档。
